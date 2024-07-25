"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var zod_1 = require("zod");
exports.User = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().nullable(),
});
