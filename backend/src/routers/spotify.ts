import z from 'zod';
import { generateRandomImages } from '../services/spotify';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TrackListImage } from '../types/image';

export const spotifyRouter = createTRPCRouter({

  generateRandomImages: publicProcedure
    .input(z.void())
    .output(z.array(TrackListImage))
    .query(async () => {
			const result = await generateRandomImages();
      return result;
    }),
});
