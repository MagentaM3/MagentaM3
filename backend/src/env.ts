import { createEnv } from '@t3-oss/env-core';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    SERVER_PORT: z.coerce.number(),
  },
  runtimeEnv: process.env,
});