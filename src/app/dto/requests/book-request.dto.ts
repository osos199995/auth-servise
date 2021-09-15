import { Joi } from 'express-validation'
export const CreateBookRequestDto = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
}
