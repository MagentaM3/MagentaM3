import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { renderTrpcPanel } from 'trpc-panel';
import { env } from './env';
import { LogModule, Logger } from './logging';
import { appRouter } from './routers/_app';

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
  return res.send(renderTrpcPanel(appRouter, { url: 'http://localhost:8000/trpc' }));
});

const port = env.SERVER_PORT;

app.listen(port, () => {
  Logger.Info(LM, `Server is running on PORT=${port}`);
});
