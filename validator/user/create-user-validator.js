const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    email: Joi.string().email(),
    // email: Joi.string()
    // .regex(regexpEnum.EMAIL_REGEXP),
    name: Joi.string()
        .alphanum()
        .trim()
        .min(3)
        .max(24)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    phone: Joi.string().trim().regex(regexpEnum.PHONE_REGEXP).required(),
});
