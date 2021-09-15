"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookRequestDto = void 0;
var express_validation_1 = require("express-validation");
exports.CreateBookRequestDto = {
    body: express_validation_1.Joi.object({
        title: express_validation_1.Joi.string().required(),
        description: express_validation_1.Joi.string().required(),
    }),
};
//# sourceMappingURL=book-request.dto.js.map