import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { renderTrpcPanel } from 'trpc-panel';
import { seedDB } from './db/seed';
import { env } from './env';
import { LogModule, Logger } from './logging';
import { appRouter } from './routers/_app';

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const redirectUri = env.SPOTIFY_REDIRECT_URI;

// const searchSpotify = async () => {

//   const api = SpotifyApi.withClientCredentials(
//     clientId,
//     clientSecret
//   );

//   try {
//     const items = await api.search("The Beatles", ["artist"]);
//     console.table(items.artists.items.map((item) => ({
//       name: item.name,
//       followers: item.followers.total,
//       popularity: item.popularity,
//     })));
//   } catch (error) {
//     console.error('Error searching Spotify:', error);
//   }
// };

// const searchSpotify = async () => {

//   console.log("Searching Spotify for The Beatles...");

//   const api = SpotifyApi.withClientCredentials(
//     clientId,
//     clientSecret
//   );

//   const items = await api.search("The Beatles", ["artist"]);

//   console.table(items.artists.items.map((item) => ({
//     name: item.name,
//     followers: item.followers.total,
//     popularity: item.popularity,
//   })));

// };


// const main = () => {
//   searchSpotify().catch(error => console.error(error));
// };

// main();


const LM = new LogModule('INDEX');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// change below however you want, just want to test Spotify API
app.get('/playlists', () => {
  void (async () => {
    // TODO implement a Spotify API call
  })();
});

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.use('/panel', (_, res) => {
  return res.send(renderTrpcPanel(appRouter, { url: 'http://localhost:8080/trpc' }));
});

const port = env.SERVER_PORT;

app.listen(port, async () => {
  Logger.Info(LM, `Server is running on PORT=${port}`);
  await seedDB();
});
