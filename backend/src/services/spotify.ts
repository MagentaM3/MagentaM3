import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { env } from '../env';

const clientId: string = env.SPOTIFY_CLIENT_ID;

export const getSpotifyApi = (accessToken: AccessToken): SpotifyApi =>
	SpotifyApi.withAccessToken(clientId, accessToken);

export const syncSpotifyData = async (accessToken: AccessToken) => {
	await syncUserProfile(accessToken);
	await syncUserPlaylists(accessToken);
}

export const syncUserProfile = async (accessToken: AccessToken) => {
	const spotifyApi = getSpotifyApi(accessToken);
	const profile = await spotifyApi.currentUser.profile();
	console.log(profile);
}

export const syncUserPlaylists = async (accessToken: AccessToken) => {
	const spotifyApi = getSpotifyApi(accessToken);
	// TODO: handle > 50 playlists
	const playlists = await spotifyApi.currentUser.playlists.playlists();
	console.log(playlists);
	// TODO: add filter for playlists with up-to-date snapshot id
	await Promise.all(playlists.items.map(p => syncPlaylist(accessToken, p.id)));
}

export const syncPlaylist = async (accessToken: AccessToken, playlistId: string) => {
	const spotifyApi = getSpotifyApi(accessToken);

	const playlist = await spotifyApi.playlists.getPlaylist(playlistId);

	const playlistItemsRequests = [];

	const limit = 50;
	for (let offset = 0; offset < playlist.tracks.total; offset += limit) {
		playlistItemsRequests.push(spotifyApi.playlists.getPlaylistItems(playlistId, undefined, '', limit, offset));
	}

	const playlistItems = await Promise.all(playlistItemsRequests);

	console.log(playlist);
	console.log(playlistItems);
}