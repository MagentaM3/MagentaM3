import { inferAsyncReturnType } from '@trpc/server';

export const createContext = () => {
  // For authentication later maybe
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
