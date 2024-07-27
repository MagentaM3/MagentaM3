import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import crypto from 'crypto';
import express, { Request, Response } from 'express';
import querystring from 'querystring';
import request from 'request';
import { renderTrpcPanel } from 'trpc-panel';
import { seedDB } from './db/seed';
import { env } from './env';
import { LogModule, Logger } from './logging';
import { appRouter } from './routers/_app';

const clientId: string = env.SPOTIFY_CLIENT_ID;
const clientSecret: string = env.SPOTIFY_CLIENT_SECRET;
const redirectUri: string = env.SPOTIFY_REDIRECT_URI;
const port: number = env.SERVER_PORT;

const generateRandomString = (length: number): string => {
  return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0, length);
};

const stateKey: string = 'spotify_auth_state';

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'))
  .use(cookieParser());

app.get('/login', (req: Request, res: Response) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    }));
});

app.get('/callback', (req: Request, res: Response) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(`Received state: ${state}`);
  console.log(`Stored state: ${storedState}`);

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error: any, response: request.Response, body: any) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
          refresh_token = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        };

        request.get(options, (error: any, response: request.Response, body: any) => {
          console.log(body);
        });

        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', (req: Request, res: Response) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error: any, response: request.Response, body: any) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token,
        refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token
      });
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
  }),
);

app.use('/panel', (_, res) => {
  return res.send(renderTrpcPanel(appRouter, { url: 'http://localhost:8080/trpc' }));
});

app.listen(port, async () => {
  Logger.Info(new LogModule('INDEX'), `Server is running on PORT=${port}`);
  await seedDB();
});
