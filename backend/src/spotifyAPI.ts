import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { env } from './env';

const clientId: string = env.SPOTIFY_CLIENT_ID;

export const getSpotifyApi = (accessToken: AccessToken): SpotifyApi =>
	SpotifyApi.withAccessToken(clientId, accessToken);