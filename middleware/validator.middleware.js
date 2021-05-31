const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { someFieldValidator } = require('../validator');

module.exports = {
    passwordValidate: async (req, res, next) => {
        try {
            const { error } = await someFieldValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    emailValidate: async (req, res, next) => {
        try {
            const { error } = await someFieldValidator.emailValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
