"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserRequest = void 0;
var express_validation_1 = require("express-validation");
exports.RegisterUserRequest = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string()
            .email()
            .required(),
        name: express_validation_1.Joi.string()
    }),
};
//# sourceMappingURL=user.request.js.map