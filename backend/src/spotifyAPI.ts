import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';
// import axios from 'axios';

export const api = (clientId: string, accessToken: AccessToken): SpotifyApi => {
    return SpotifyApi.withAccessToken(clientId, accessToken);
};

export const getCurrentUserProfile = async (clientId: string, accessToken: AccessToken): Promise<string> => {

    const profile = await api(clientId, accessToken).currentUser.profile();

    console.log(profile)
    return JSON.stringify(profile)
};

export const getCurrentUserPlaylists = async (clientId: string, accessToken: AccessToken): Promise<string> => {

    const playlists = await api(clientId, accessToken).currentUser.playlists.playlists();

    console.log(playlists)
    return JSON.stringify(playlists)
};

export const getPlaylistItems = async (clientId: string, accessToken: AccessToken, playlistId: string): Promise<string> => {

    const playlistItems = await api(clientId, accessToken).playlists.getPlaylistItems(playlistId);

    console.log(playlistItems)
    return JSON.stringify(playlistItems)
};