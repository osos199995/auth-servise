"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.routes();
    }
    Server.prototype.configuration = function () {
        this.app.set('port', process.env.PORT || 3000);
    };
    Server.prototype.routes = function () {
        this.app.get('/', function (req, res) {
            res.send('Hello world');
        });
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("listening to port " + _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
//
// const app = express();
// const port = 3000;
//
// app.use(bodyParser.json())
//
// router(app)
// app.use((err:any, req:any, res:any, next:any)=> {
//     if (err instanceof ValidationError) {
//         return res.status(err.statusCode).json(err)
//     }
//     return res.status(500).json(err)
// })
// // @ts-ignore
// app.listen(port, (err: any) => {
//    console.log(`server is listening on ${port}`);
// });
//# sourceMappingURL=app.js.map