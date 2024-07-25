"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var env_core_1 = require("@t3-oss/env-core");
var dotenv_1 = require("dotenv");
var zod_1 = require("zod");
dotenv_1.default.config();
exports.env = (0, env_core_1.createEnv)({
    server: {
        NODE_ENV: zod_1.z.enum(['development', 'production']),
        DB_HOST: zod_1.z.string(),
        DB_PORT: zod_1.z.coerce.number(),
        DB_USER: zod_1.z.string(),
        DB_PASSWORD: zod_1.z.string(),
        DB_NAME: zod_1.z.string(),
        SERVER_PORT: zod_1.z.coerce.number(),
        SPOTIFY_CLIENT_ID: zod_1.z.string(),
        SPOTIFY_CLIENT_SECRET: zod_1.z.string(),
        SPOTIFY_REDIRECT_URI: zod_1.z.string(),
    },
    runtimeEnv: process.env,
});
