import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { SuperJSON } from "superjson";
import { ZodError } from "zod";

export const createContext = async ({ req, res }: CreateExpressContextOptions) => {
	return {
		session: req.session,
		req,
		res,
	};
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.accessToken) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, accessToken: ctx.session.accessToken },
      },
    });
  });
