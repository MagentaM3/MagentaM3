import { AccessToken } from '@spotify/web-api-ts-sdk';
import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import request from 'request';
import { renderTrpcPanel } from 'trpc-panel';
import { seedDB } from './db/seed';
import { env } from './env';
import { LogModule, Logger } from './logging';
import { appRouter } from './routers/_app';
import { createContext } from './trpc';

const clientId: string = env.SPOTIFY_CLIENT_ID;
const clientSecret: string = env.SPOTIFY_CLIENT_SECRET;
const redirectUri: string = env.SPOTIFY_REDIRECT_URI;
const port: number = env.SERVER_PORT;
const clientUrl: string = env.CLIENT_URL;

declare module 'express-session' {
  interface SessionData {
    accessToken: AccessToken;
  }
}

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const corsOptions = {
  origin: clientUrl,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'))
  .use(cookieParser());

app.get('/callback', (req: Request, res: Response) => {
  const code = req.query.code || null;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request.post(authOptions, async (error: any, response: request.Response, body: any) => {
    if (!error && response.statusCode === 200) {
      req.session.accessToken = body;
			res.redirect(clientUrl + '/playlist/');
    }
  });
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
		createContext
  }),
);

app.use('/panel', (_, res) => {
  return res.send(renderTrpcPanel(appRouter, { url: 'http://localhost:8080/trpc' }));
});

app.listen(port, async () => {
  Logger.Info(new LogModule('INDEX'), `Server is running on PORT=${port}`);
  await seedDB();
});
