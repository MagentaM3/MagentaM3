import { z } from 'zod';
import { getUserPlaylist, getUserPlaylists } from '../services/playlist';
import { getUserId } from '../services/spotify';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { Playlist } from '../types/playlist';

export const playlistRouter = createTRPCRouter({
	// TODO: fix "TRPCClientError: The app has exceeded its rate limits." when 
	// sync is pressed in rapid succession
	getPlaylists: protectedProcedure
		.query(async ({ ctx }) => {
			const userId = await getUserId(ctx.session.accessToken);
			return await getUserPlaylists(userId);
		}),

	getPlaylist: protectedProcedure
		.input(z.object({ playlistId: z.string() }))
		.output(Playlist)
		.query(async ({ ctx, input }) => {
			const userId = await getUserId(ctx.session.accessToken);
			const res = await getUserPlaylist(userId, input.playlistId);
			// console.log(res)
			return res

		}),
});
