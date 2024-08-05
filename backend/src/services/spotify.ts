import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { env } from '../env';

const clientId: string = env.SPOTIFY_CLIENT_ID;
const clientSecret: string = env.SPOTIFY_CLIENT_SECRET;

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

export const generateRandomImages = async () => {
	const spotifyApi = SpotifyApi.withClientCredentials(clientId, clientSecret);

	const artistIds = [
		"6USv9qhCn6zfxlBQIYJ9qs",
		"2HkSsS8O2U2gPhnCGVN5vn",
		"142YBUGmLWCJigFLzgguf8"
	]

	const randomId = artistIds[Math.floor(Math.random() * artistIds.length)]

	const albums = await spotifyApi.artists.albums(randomId, 'album,single', 'ES', 5);

	return albums.items.map(item => {
		return {name: item.name, value: item.release_date, url: item.images[0].url, width: 100, height: 100};
	});

} 