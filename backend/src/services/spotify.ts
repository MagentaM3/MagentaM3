import { AccessToken, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { eq } from 'drizzle-orm';
import { v4 } from 'uuid';
import { db } from '../db/connection';
import { albums } from '../db/schema/album';
import { artists } from '../db/schema/artist';
import { playlists } from '../db/schema/playlist';
import { playlistTracks } from '../db/schema/playlistTrack';
import { tracks } from '../db/schema/track';
import { users } from '../db/schema/user';
import { env } from '../env';
import { AlbumTypeZ, ReleaseDatePrecisionZ } from '../types/album';

const clientId: string = env.SPOTIFY_CLIENT_ID;
const PLAYLIST_ITEMS_LIMIT = 50;

export const getSpotifyApi = (accessToken: AccessToken): SpotifyApi =>
	SpotifyApi.withAccessToken(clientId, accessToken);

export const syncSpotifyData = async (accessToken: AccessToken) => {
	await syncUserProfile(accessToken);
	await syncUserPlaylists(accessToken);
}

export const syncUserProfile = async (accessToken: AccessToken) => {
	const spotifyApi = getSpotifyApi(accessToken);
	const profile = await spotifyApi.currentUser.profile();
	const data = {
		displayName: profile.display_name,  
		country: profile.country,
		email: profile.email,
		uri: profile.uri
	}

	await db
  .insert(users)
  .values({ 
		id: profile.id, 
		...data
	})
  .onConflictDoUpdate({
    target: users.id,
    set: data,
  });
}

export const syncUserPlaylists = async (accessToken: AccessToken) => {
	const spotifyApi = getSpotifyApi(accessToken);
	// TODO: handle > 50 playlists
	const playlists = await spotifyApi.currentUser.playlists.playlists();
	await Promise.all(playlists.items.map(p => syncPlaylist(accessToken, p.id)));
}

export const syncPlaylist = async (accessToken: AccessToken, playlistId: string) => {
	
	const spotifyApi = getSpotifyApi(accessToken);

	const playlist = await spotifyApi.playlists.getPlaylist(playlistId);

	const dbPlaylist = await db.select().from(playlists).where(eq(playlists.id, playlistId))

	if (dbPlaylist.length > 0 && playlist.snapshot_id == dbPlaylist[0].snapshotId) {
		return;
	}

	// CLEAR ALL PLAYLIST TRACKS

	const data = {
		collaborative: playlist.collaborative,
		description: playlist.description,
		name: playlist.name,
		ownerId: playlist.owner.id,
		snapshotId: playlist.snapshot_id,
		uri: playlist.uri
	}

	await db
  .insert(playlists)
  .values({ 
		id: playlist.id, 
		...data
	})
  .onConflictDoUpdate({
    target: users.id,
    set: data,
  });

	const playlistItemsRequests = [];

	for (let offset = 0; offset < playlist.tracks.total; offset += PLAYLIST_ITEMS_LIMIT) {
		playlistItemsRequests.push(syncPlaylistItems(accessToken, playlistId, offset));
	}

	return Promise.all(playlistItemsRequests)
}

const syncPlaylistItems = async (accessToken: AccessToken, playlistId: string, offset: number) => {
	const spotifyApi = getSpotifyApi(accessToken);
	const playlistItems = await spotifyApi.playlists.getPlaylistItems(playlistId, undefined, '', PLAYLIST_ITEMS_LIMIT, offset);

	return Promise.all(playlistItems.items.map(async item => {
		const data = {
			id: v4(),
			addedAt: item.added_at,
			addedById: item.added_by.id,
			trackId: item.track.id,
			playlistId: playlistId
		}

		await db
		.insert(playlistTracks)
		.values(data)

		// TODO: only uses the fields of the PlaylistedTrack i.e. doesn't make any
		// additional calls to Spotify
		return syncPlaylistTrack(item.track);
	}))
}

const syncPlaylistTrack = async (playlistTrack: Track) => {
	
	const trackData = {
		id: playlistTrack.id,
		albumId: playlistTrack.album.id,
		durationMs: playlistTrack.duration_ms,
		discNumber: playlistTrack.disc_number,
		explict: playlistTrack.explicit,
		name: playlistTrack.name,
		popularity: playlistTrack.popularity,
		previewUrl: playlistTrack.preview_url,
		trackNumber: playlistTrack.track_number,
		uri: playlistTrack.uri
	}
	
	const trackInsert = db.insert(tracks)
		.values(trackData)
		.onConflictDoNothing();

	const albumData = {
		id: playlistTrack.album.id,
		albumType: playlistTrack.album.album_type as AlbumTypeZ,
		totalTracks: playlistTrack.album.total_tracks,
		name: playlistTrack.album.name,
		releaseDate: playlistTrack.album.release_date,
		releaseDatePrecision: playlistTrack.album.release_date_precision as ReleaseDatePrecisionZ,
		uri: playlistTrack.album.uri
	}

	const albumInsert = db.insert(albums)
		.values(albumData)
		.onConflictDoNothing();

	const artistInsert = Promise.all(playlistTrack.artists.map(async (artist) => {
		const artistData = {
			id: artist.id,
			name: artist.name,
			uri: artist.uri,
		}

		return db.insert(artists)
			.values(artistData)
			.onConflictDoNothing();
	}))

	return Promise.all([trackInsert, albumInsert, artistInsert])
}