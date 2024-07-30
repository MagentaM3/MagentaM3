import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';

export class SpotifyService {
    private clientId: string;
    private accessToken: AccessToken;

    // Constructor for SpotifyService (I think we only need clientId and Access
    // token to do everything?)
    constructor(clientId: string, accessToken: AccessToken) {
        this.clientId = clientId;
        this.accessToken = accessToken;
    }

    // Get user profile
    public async getCurrentUserProfile(): Promise<string> {
        const api = SpotifyApi.withAccessToken(this.clientId, this.accessToken);
        const profile = await api.currentUser.profile();
        return JSON.stringify(profile);
    }
}
