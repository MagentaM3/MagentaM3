import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "../../../backend/src/routers/_app";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export type TrackListImages = RouterOutput["spotify"]["generateRandomImages"];