const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { realtorValidator } = require('../validator');
const { Realtor } = require('../dataBase/models');
const { realtorService } = require('../service');

module.exports = {
    checkIsRealtorValid: async (req, res, next) => {
        try {
            const { error } = await realtorValidator.createRealtorValidator.validate(req.body);

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
            const user = await Realtor.findById({ _id: id });

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            req.userInfo = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailExists: async (req, res, next) => {
        try {
            const { email } = req.body;
            const realtor = await realtorService.findOneByParams({ email });

            if (realtor) {
                // res.json('REALTOR WITH THIS EMAIL EXIST');
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_ALREADY_REGISTERED);
            }
            // res.json(body);
            next();
        } catch (e) {
            next(e);
        }
    }
};