import { syncSpotifyData } from '../services/spotify';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
	// TODO: update or remove following route
	syncSpotifyData: protectedProcedure
		.mutation(({ ctx }) => {
			// use your ORM of choice
			syncSpotifyData(ctx.session.accessToken);
		}),
});
