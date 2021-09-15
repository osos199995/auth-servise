"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRouter = void 0;
var user_interface_1 = require("./user.interface");
var book_interface_1 = require("./book.interface");
var permissions_interface_1 = require("./permissions.interface");
var CustomRouter = /** @class */ (function () {
    function CustomRouter(app) {
        this.app = app;
    }
    CustomRouter.prototype.routing = function () {
        this.userInterface = new user_interface_1.UserInterface();
        this.bookInterface = new book_interface_1.BookInterface();
        this.permissionsInterface = new permissions_interface_1.PermissionsInterface();
        this.app.use('/api/users/', this.userInterface.router);
        this.app.use('/api/books/', this.bookInterface.router);
        this.app.use('/api/permissions/', this.permissionsInterface.router);
        this.app.get('/', function (req, res) {
            res.send('pong!');
        });
    };
    return CustomRouter;
}());
exports.CustomRouter = CustomRouter;
//# sourceMappingURL=custom-router.js.map