"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogModule = void 0;
var winston_1 = require("winston");
var env_1 = require("./env");
var LogModule = /** @class */ (function () {
    function LogModule(module) {
        var _this = this;
        this.getModule = function () { return _this.module; };
        this.module = module;
    }
    return LogModule;
}());
exports.LogModule = LogModule;
var LogLevel;
(function (LogLevel) {
    // Fatal errors that would kill the program
    LogLevel["Error"] = "error";
    // Errors that are not fatal but should be looked at
    LogLevel["Warn"] = "warn";
    // Default level of logging
    LogLevel["Info"] = "info";
    // Use for debugging purposes (should not make it into prod)
    LogLevel["Debug"] = "debug";
})(LogLevel || (LogLevel = {}));
var LogLocation;
(function (LogLocation) {
    LogLocation[LogLocation["Console"] = 0] = "Console";
    LogLocation[LogLocation["File"] = 1] = "File";
    LogLocation[LogLocation["Both"] = 2] = "Both";
})(LogLocation || (LogLocation = {}));
var LM = new LogModule('LOGGER');
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.Warn = function (logModule, msg) {
        _a.loggerFunc(LogLevel.Warn, msg, logModule);
    };
    Logger.Error = function (logModule, msg) {
        _a.loggerFunc(LogLevel.Error, msg, logModule);
    };
    Logger.Info = function (logModule, msg) {
        _a.loggerFunc(LogLevel.Info, msg, logModule);
    };
    Logger.Debug = function (logModule, msg) {
        _a.loggerFunc(LogLevel.Debug, msg, logModule);
    };
    Logger.loggerFunc = function (lvl, msg, logModule) {
        _a.logger.log({
            level: lvl,
            message: msg,
            logModule: logModule.getModule(),
        });
    };
    var _a;
    _a = Logger;
    Logger.CreateLogger = function (logLevel, where) {
        var getLogLevel = function () {
            if (env_1.env.NODE_ENV === 'production') {
                return LogLevel.Info;
            }
            return logLevel || LogLevel.Info;
        };
        var getTransport = function () {
            var fileTransport = new winston_1.default.transports.File({
                filename: 'server.log',
                level: getLogLevel(),
            });
            var consoleTransport = new winston_1.default.transports.Console();
            if (env_1.env.NODE_ENV === 'production' || !where) {
                return [consoleTransport];
            }
            switch (Number(where)) {
                case LogLocation.Console:
                    return [consoleTransport];
                case LogLocation.File:
                    return [fileTransport];
                case LogLocation.Both:
                    return [consoleTransport, fileTransport];
                default:
                    break;
            }
            throw new Error('Invalid transport for creating the logger.');
        };
        var format = winston_1.default.format.printf(function (_b) {
            var level = _b.level, message = _b.message, logModule = _b.logModule, timestamp = _b.timestamp;
            return "".concat(timestamp, " [").concat(level, "] [").concat(logModule, "] ").concat(message);
        });
        var logger = winston_1.default.createLogger({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format),
            levels: winston_1.default.config.syslog.levels,
            transports: getTransport(),
        });
        logger.log({
            level: LogLevel.Info,
            message: 'LOGGER INITIALISED\n',
            logModule: LM.getModule(),
        });
        return logger;
    };
    // feel free to pass arguments into createLogger to change the log level and where it logs to
    // while on local development
    Logger.logger = _a.CreateLogger(LogLevel.Info, LogLocation.Both);
    return Logger;
}());
exports.Logger = Logger;
