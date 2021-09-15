import { Joi } from 'express-validation'
import {PermissionConstants} from "../../../infrastructure/utils/constants/permissions.constant";
export const RegisterUserRequest = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        permissions:Joi.array().items(Joi.string().valid(...PermissionConstants))
    }),
}

export const LoginUserRequest = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

export const UpdateUserRequest = {
    body: Joi.object({
        email: Joi.string()
            .email(),
        name: Joi.string(),
        id: Joi.string().required(),
        permissions:Joi.array().items(Joi.string().valid(...PermissionConstants))
    }),
}
