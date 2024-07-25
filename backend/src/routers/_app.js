"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var trpc_1 = require("../trpc");
var user_1 = require("./user");
/*
How to make a request to a particular route

The POST route which allows a user to login is in `publicRouter` and handled using a procedure called `login`.
The URL for this route is: http://8080/trpc/public.login

In general, URL for routes are formatted as http://8080/trpc/<ROUTER_NAME>.<PROCEDURE>

As result, the same request can be made using a tRPC client as await <CLIENT>.public.login(<BODY>)
*/
exports.appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
});
