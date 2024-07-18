import express from 'express';
import cors from 'cors';

import { env } from './env';
import { LogModule, Logger } from './logging';

const clientId = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const redirectUri = env.SPOTIFY_REDIRECT_URI;

const LM = new LogModule('INDEX');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get("/echo", (req, res) => {
  res.send("");
});

// change below however you want, just want to test Spotify API
app.get(
  '/playlists',
  (req, res, next) => {
    void (async () => {
			// TODO implement a Spotify API call
    })();
  },
);

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

const port = env.SERVER_PORT;

app.listen(port, '0.0.0.0', () => {
  Logger.Info(LM, `Server is running on PORT=${port}`);
});