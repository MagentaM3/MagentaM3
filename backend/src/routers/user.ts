import { getUserId, syncSpotifyData } from '../services/spotify';
import { getProfile } from '../services/user';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
	// TODO: fix "TRPCClientError: The app has exceeded its rate limits." when 
	// sync is pressed in rapid succession
	syncSpotifyData: protectedProcedure
		.mutation(async ({ ctx }) => {
			await syncSpotifyData(ctx.session.accessToken);
		}),
	
	getProfile: protectedProcedure
		.query(async ({ ctx }) => {
			const userId = await getUserId(ctx.session.accessToken);
			return await getProfile(userId);
		}),
});
