// import { SpotifyWebApi } from '@spotify/web-api-ts-sdk';
// import axios from 'axios';
// import { env } from './env';

// // Choose one of the following:
// const sdk = SpotifyWebApi.withUserAuthorization("client-id", "https://localhost:3000", ["scope1", "scope2"]);
// // const sdk = SpotifyWebApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);

// var artistID = "2h93pZq0e7k5yf4dywlkpM?si=ZiVZaMTOQuK9ys9S_wXFEw";

// const getSpotifyToken = async (): Promise<string> => {
//     const clientId = env.SPOTIFY_CLIENT_ID;
//     const clientSecret = env.SPOTIFY_CLIENT_SECRET;
//     const tokenUrl = env.SPOTIFY_REDIRECT_URI;

//     const response = await axios.post(
//         tokenUrl,
//         'grant_type=client_credentials',
//         {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
//             }
//         }
//     );

//     return response.data.access_token;
// };

// const getArtistData = async (token: string, artistId: string) => {
//     const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

//     const response = await axios.get(artistUrl, {
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     });

//     return response.data;
// };

// const main = async () => {
//     try {
//         const token = await getSpotifyToken();
//         const artistId = 'YOUR_ARTIST_ID'; // Replace with the artist ID you want to get data for
//         const artistData = await getArtistData(token, artistId);

//         console.log(artistData);
//     } catch (error) {
//         console.error('Error fetching artist data:', error);
//     }
// };

// main();
