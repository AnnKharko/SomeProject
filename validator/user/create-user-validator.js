const Joi = require('joi');
const { constant, regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(24)
        .required(),
    yearOfBorn: Joi.number().integer().min(constant.CURRENT_YEAR - 100).max(constant.CURRENT_YEAR - 18),
    gender: Joi.string(),
    // email: Joi.string()
    // .regex(regexpEnum.EMAIL_REGEXP)
    // .required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    repeat_password: Joi.ref('password'),
});
