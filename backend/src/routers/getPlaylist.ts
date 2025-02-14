import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({

    getTracksByPlaylist: protectedProcedure
        .query(async ({ ctx }) => {
            // const playlistId = await getPlaylistId(ctx.session.accessToken);
            // return await getTracksByPlaylist(playlistId);
            return
        }),
});
