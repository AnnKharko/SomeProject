const jwt = require('jsonwebtoken');
const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { constant } = require('../constant');
const {
    JWT_ACTIVATE_SECRET, JWT_RESET_PASSWORD_SECRET, JWT_REFRESH_SECRET, JWT_SECRET
} = require('../config/config');
const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_TOKEN);
                }
            });

            // ===== CHECK DATA BASE
            const tokens = await O_Auth.findOne({ access_token }).populate('realtor');

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_TOKEN);
            }

            req.infoTokens = tokens._id;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constant.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.REFRESH_TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_REFRESH_TOKEN);
                }
            });

            // ===== CHECK DATA BASE
            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_REFRESH_TOKEN);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActivateToken: async (req, res, next) => {
        try {
            const activate_token = req.get(constant.AUTHORIZATION);

            if (!activate_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.ACTIVATE_TOKEN_IS_REQUIRED);
            }

            jwt.verify(activate_token, JWT_ACTIVATE_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_ACTIVATE_TOKEN);
                }
            });

            const realtor = await O_Auth.findOne({ activate_token }).populate('realtor');

            if (!realtor) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_ACTIVATE_TOKEN);
            }
            req.activeInfo = realtor;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkResetPasswordToken: async (req, res, next) => {
        try {
            const reset_password_token = req.get(constant.AUTHORIZATION);

            if (!reset_password_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.RESET_PASSWORD_TOKEN_IS_REQUIRED);
            }

            jwt.verify(reset_password_token, JWT_RESET_PASSWORD_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_RESET_PASSWORD_TOKEN);
                }
            });

            const realtor = await O_Auth.findOne({ reset_password_token }).populate('realtor');

            if (!realtor) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_RESET_PASSWORD_TOKEN);
            }
            req.resPasswordInfo = realtor;

            next();
        } catch (e) {
            next(e);
        }
    }
};
