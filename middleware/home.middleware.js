const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { homeValidator } = require('../validator');
const { Home } = require('../dataBase/models');

module.exports = {
    checkIsHomeValid: async (req, res, next) => {
        try {
            const { error } = await homeValidator.createHomeValidator.validate(req.body);

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

            const home = await Home.findById(id);

            if (!home) {
                return next(new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.HOME_NOT_FOUND));
            }

            req.home = home;
            next();
        } catch (e) {
            next(e);
        }
    }
};
