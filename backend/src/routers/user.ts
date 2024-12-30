import { syncSpotifyData } from '../services/spotify';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
	syncSpotifyData: protectedProcedure
		.mutation(({ ctx }) => {
			// use your ORM of choice
			syncSpotifyData(ctx.session.accessToken);
		}),
});
