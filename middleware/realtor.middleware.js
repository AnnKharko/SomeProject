const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { Realtor } = require('../dataBase/models');
const { realtorValidator } = require('../validator');
const { realtorService } = require('../service');
const { STATUS_ENUM } = require('../constant/constant');

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
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_ALREADY_REGISTERED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsRealtorExists: async (req, res, next) => {
        try {
            const { email } = req.body;
            const realtor = await realtorService.findOneByParams({ email });

            if (!realtor) {
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_NOT_FOUND));
            }

            req.realtor = realtor;
            next();
        } catch (e) {
            next(e);
        }
    },
    chekIsRealtorConfirmed: (req, res, next) => {
        try {
            const { status } = req.realtor;

            if (status !== STATUS_ENUM.CONFIRMED) {
                return next(new ErrorHandler(errorCodesEnum.FORBIDDEN, errorCustomCodes.FORBIDDEN_REALTOR_NOT_CONFIRMED));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
