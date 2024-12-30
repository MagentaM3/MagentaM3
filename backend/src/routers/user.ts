import { syncSpotifyData } from '../services/spotify';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
	// TODO: fix "TRPCClientError: The app has exceeded its rate limits." when 
	// sync is pressed in rapid succession
	syncSpotifyData: protectedProcedure
		.mutation(async ({ ctx }) => {
			// use your ORM of choice
			console.log('hello');
			await syncSpotifyData(ctx.session.accessToken);
			console.log('bye');
		}),
});
