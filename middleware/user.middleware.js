const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { userValidator } = require('../validator');
const { User } = require('../dataBase/models');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsIdValid: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById({ _id: id });

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            req.userInfo = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
