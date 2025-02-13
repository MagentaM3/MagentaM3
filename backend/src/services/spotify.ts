import { AccessToken, SpotifyApi, Track } from '@spotify/web-api-ts-sdk';
import { eq } from 'drizzle-orm';
import { v4 } from 'uuid';
import { convertToDateTimestamp } from '../../utils/dateHelper';
import { db } from '../db/connection';
import { albums, artistsToAlbums } from '../db/schema/album';
import { artists } from '../db/schema/artist';
import { images } from '../db/schema/images';
import { playlists } from '../db/schema/playlist';
import { playlistTracks } from '../db/schema/playlistTrack';
import { tracks, tracksToArtists } from '../db/schema/track';
import { users } from '../db/schema/user';
import { env } from '../env';
import { Logger, LogModule } from '../logging';
import { AlbumTypeZ, ReleaseDatePrecisionZ } from '../types/album';

const clientId: string = env.SPOTIFY_CLIENT_ID;
const PLAYLIST_ITEMS_LIMIT = 50;

const LM = new LogModule('SEEDER');

export const getSpotifyApi = (accessToken: AccessToken): SpotifyApi =>
	SpotifyApi.withAccessToken(clientId, accessToken);

export const syncSpotifyData = async (accessToken: AccessToken) => {
	Logger.Info(LM, `Spotify data sync started`);
	await syncUserProfile(accessToken);
	await syncUserPlaylists(accessToken);
	Logger.Info(LM, `Spotify data sync finished`);
}

export const syncUserProfile = async (accessToken: AccessToken) => {
	const spotifyApi = getSpotifyApi(accessToken);
	const profile = await spotifyApi.currentUser.profile();
	Logger.Info(LM, `Syncing data for user ${profile.display_name}`);
	const data = {
		displayName: profile.display_name,
		country: profile.country,
		email: profile.email,
		uri: profile.uri
	}

	await db.insert(users)
		.values({
			id: profile.id,
			...data
		})
		.onConflictDoUpdate({
			target: users.id,
			set: data,
		});

	await Promise.all(profile.images.map(async (image) => {
		return db.insert(images)
			.values({
				url: image.url,
				height: image.height,
				width: image.width,
				userId: profile.id
			})
			.onConflictDoNothing();
	}))
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
	Logger.Info(LM, `Syncing data for playlist ${playlist.name}`);

	const dbPlaylist = await db.select().from(playlists).where(eq(playlists.id, playlistId))

	if (dbPlaylist.length > 0 && playlist.snapshot_id == dbPlaylist[0].snapshotId) {
		return;
	}

	await db.delete(playlistTracks).where(eq(playlistTracks.playlistId, playlistId));

	const data = {
		collaborative: playlist.collaborative,
		description: playlist.description,
		name: playlist.name,
		ownerId: playlist.owner.id,
		snapshotId: playlist.snapshot_id,
		uri: playlist.uri
	}

	await db.insert(playlists)
		.values({
			id: playlist.id,
			...data
		})
		.onConflictDoUpdate({
			target: users.id,
			set: data,
		});

	await Promise.all(playlist.images.map(async (image) => {
		return db.insert(images)
			.values({
				url: image.url,
				height: image.height,
				width: image.width,
				playlistId: playlist.id
			})
			.onConflictDoNothing();
	}))

	const playlistItemsRequests = [];

	for (let offset = 0; offset < playlist.tracks.total; offset += PLAYLIST_ITEMS_LIMIT) {
		playlistItemsRequests.push(syncPlaylistItems(accessToken, playlistId, offset));
	}

	return Promise.all(playlistItemsRequests)
}

const syncPlaylistItems = async (accessToken: AccessToken, playlistId: string, offset: number) => {
	const spotifyApi = getSpotifyApi(accessToken);
	const playlistItems = await spotifyApi.playlists.getPlaylistItems(playlistId, undefined, '', PLAYLIST_ITEMS_LIMIT, offset);

	return Promise.all(playlistItems.items
		// TODO: handle local files and episode
		.filter(item => item && item.track && !item.is_local && item.track.type == 'track')
		.map(async item => {
			const data = {
				id: v4(),
				addedAt: item.added_at,
				addedById: item.added_by.id,
				trackId: item.track.id,
				playlistId: playlistId
			}

			await syncPlaylistTrack(item.track)

			// TODO: only uses the fields of the PlaylistedTrack i.e. doesn't make any
			// additional calls to Spotify
			return db
				.insert(playlistTracks)
				.values(data);
		}))
}

const syncPlaylistTrack = async (playlistTrack: Track) => {

	const albumReleaseDate = playlistTrack.album.release_date;
	const albumReleaseDatePrecision = playlistTrack.album.release_date_precision as ReleaseDatePrecisionZ;

	const albumData = {
		id: playlistTrack.album.id,
		albumType: playlistTrack.album.album_type as AlbumTypeZ,
		totalTracks: playlistTrack.album.total_tracks,
		name: playlistTrack.album.name,
		releaseDate: convertToDateTimestamp(albumReleaseDate, albumReleaseDatePrecision),
		releaseDatePrecision: albumReleaseDatePrecision,
		uri: playlistTrack.album.uri
	}

	await db.insert(albums)
		.values(albumData)
		.onConflictDoNothing();

	await Promise.all(playlistTrack.album.images.map(async (image) => {
		return db.insert(images)
			.values({
				url: image.url,
				height: image.height,
				width: image.width,
				albumId: playlistTrack.album.id
			})
			.onConflictDoNothing();
	}))

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

	const artistInsert = Promise.all(playlistTrack.artists.map(async (artist) => {
		const artistData = {
			id: artist.id,
			name: artist.name,
			uri: artist.uri,
		}

		return db.insert(artists)
			.values(artistData)
			.onConflictDoNothing();
	}));

	await Promise.all([trackInsert, artistInsert]);

	const trackToArtistInsert = Promise.all(playlistTrack.artists.map(async (artist) => {
		return db.insert(tracksToArtists)
			.values({ artistId: artist.id, trackId: trackData.id })
			.onConflictDoNothing();
	}));

	const artistToAlbumInsert = Promise.all(playlistTrack.artists.map(async (artist) => {
		return db.insert(artistsToAlbums)
			.values({ artistId: artist.id, albumId: albumData.id })
			.onConflictDoNothing();
	}));

	return Promise.all([trackToArtistInsert, artistToAlbumInsert]);
}

export const getUserPlaylists = async () => {
	const allImages = await db.select().from(playlists);
	const allPlaylists = db.select().from(playlists).innerJoin(images, eq(playlists.id, images.playlistId)).where(eq(images.width, 640));
	// console.log({ allUsers });
	console.log({ allImages })

	return allPlaylists
}