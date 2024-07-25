"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var web_api_ts_sdk_1 = require("@spotify/web-api-ts-sdk");
var trpcExpress = require("@trpc/server/adapters/express");
var cors_1 = require("cors");
var express_1 = require("express");
var trpc_panel_1 = require("trpc-panel");
var seed_1 = require("./db/seed");
var env_1 = require("./env");
var logging_1 = require("./logging");
var _app_1 = require("./routers/_app");
var clientId = env_1.env.SPOTIFY_CLIENT_ID;
var clientSecret = env_1.env.SPOTIFY_CLIENT_SECRET;
var redirectUri = env_1.env.SPOTIFY_REDIRECT_URI;
// const searchSpotify = async () => {
//   const api = SpotifyApi.withClientCredentials(
//     clientId,
//     clientSecret
//   );
//   try {
//     const items = await api.search("The Beatles", ["artist"]);
//     console.table(items.artists.items.map((item) => ({
//       name: item.name,
//       followers: item.followers.total,
//       popularity: item.popularity,
//     })));
//   } catch (error) {
//     console.error('Error searching Spotify:', error);
//   }
// };
var searchSpotify = function () { return __awaiter(void 0, void 0, void 0, function () {
    var api, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Searching Spotify for The Beatles...");
                api = web_api_ts_sdk_1.SpotifyApi.withClientCredentials(clientId, clientSecret);
                return [4 /*yield*/, api.search("The Beatles", ["artist"])];
            case 1:
                items = _a.sent();
                console.table(items.artists.items.map(function (item) { return ({
                    name: item.name,
                    followers: item.followers.total,
                    popularity: item.popularity,
                }); }));
                return [2 /*return*/];
        }
    });
}); };
var main = function () {
    searchSpotify().catch(function (error) { return console.error(error); });
};
main();
var LM = new logging_1.LogModule('INDEX');
var app = (0, express_1.default)();
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// change below however you want, just want to test Spotify API
app.get('/playlists', function () {
    void (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); })();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: _app_1.appRouter,
}));
app.use('/panel', function (_, res) {
    return res.send((0, trpc_panel_1.renderTrpcPanel)(_app_1.appRouter, { url: 'http://localhost:8080/trpc' }));
});
var port = env_1.env.SERVER_PORT;
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.Logger.Info(LM, "Server is running on PORT=".concat(port));
                return [4 /*yield*/, (0, seed_1.seedDB)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
