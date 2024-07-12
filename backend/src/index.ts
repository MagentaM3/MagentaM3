import express from 'express';
import cors from 'cors';

import { env } from './env';
import { LogModule, Logger } from './logging';

const LM = new LogModule('INDEX');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get("/echo", (req, res) => {
  res.send("echo");
});


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