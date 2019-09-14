import Joi from '@hapi/joi';

export const UserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .trim()
    .required()
  ,
  name: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
