import { getUserId } from '../services/spotify';
import { getUserPlaylists } from '../services/user';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const playlistRouter = createTRPCRouter({
	// TODO: fix "TRPCClientError: The app has exceeded its rate limits." when 
	// sync is pressed in rapid succession
	getPlaylists: protectedProcedure
		.query(async ({ ctx }) => {
			const userId = await getUserId(ctx.session.accessToken);
			return await getUserPlaylists(userId);
		}),
});