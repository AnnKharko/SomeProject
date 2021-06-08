const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { homeValidator } = require('../validator');

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
    }
};
