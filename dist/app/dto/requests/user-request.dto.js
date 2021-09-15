"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRequest = exports.LoginUserRequest = exports.RegisterUserRequest = void 0;
var express_validation_1 = require("express-validation");
var permissions_constant_1 = require("../../../infrastructure/utils/constants/permissions.constant");
exports.RegisterUserRequest = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string()
            .email()
            .required(),
        name: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required(),
        permissions: express_validation_1.Joi.array().items((_a = express_validation_1.Joi.string()).valid.apply(_a, permissions_constant_1.PermissionConstants))
    }),
};
exports.LoginUserRequest = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required(),
    }),
};
exports.UpdateUserRequest = {
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string()
            .email(),
        name: express_validation_1.Joi.string(),
        id: express_validation_1.Joi.string().required(),
        permissions: express_validation_1.Joi.array().items((_b = express_validation_1.Joi.string()).valid.apply(_b, permissions_constant_1.PermissionConstants))
    }),
};
//# sourceMappingURL=user-request.dto.js.map