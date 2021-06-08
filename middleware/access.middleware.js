const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { Realtor } = require('../dataBase/models');

module.exports = {
    checkRole: (whoHaveAccess = []) => async (req, res, next) => {
        try {
            const { realtorId } = req;
            const realtor = await Realtor.findById(realtorId);

            if (!whoHaveAccess.length) {
                return next();
            }

            if (!whoHaveAccess.includes(realtor.role)) {
                throw new ErrorHandler(errorCodesEnum.FORBIDDEN, errorCustomCodes.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
