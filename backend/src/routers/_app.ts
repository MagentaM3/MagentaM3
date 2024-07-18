import { router } from '../trpc';
import { userRouter } from './user';

/*
How to make a request to a particular route

The POST route which allows a user to login is in `publicRouter` and handled using a procedure called `login`.
The URL for this route is: http://8080/trpc/public.login

In general, URL for routes are formatted as http://8080/trpc/<ROUTER_NAME>.<PROCEDURE>

As result, the same request can be made using a tRPC client as await <CLIENT>.public.login(<BODY>)
*/

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
