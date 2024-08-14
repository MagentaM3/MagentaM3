import { createTRPCRouter } from '../trpc';
import { spotifyRouter } from './spotify';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  user: userRouter,
	spotify: spotifyRouter,
});

export type AppRouter = typeof appRouter;
