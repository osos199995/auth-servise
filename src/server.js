"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server = (0, express_1.default)();
var port = 3000;
server.get('/', function (req, res) {
    res.send('The sedulous hyena ate the antelope!');
});
// @ts-ignore
server.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("server is listening on " + port);
});
