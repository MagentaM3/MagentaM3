"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var env_1 = require("../env");
var client = (0, postgres_1.default)({
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    database: env_1.env.DB_NAME,
    username: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
});
exports.db = (0, postgres_js_1.drizzle)(client);
