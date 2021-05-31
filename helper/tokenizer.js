const jwt = require('jsonwebtoken');

const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    JWT_ACTIVATE_SECRET,
    JWT_ACTIVATE_SECRET_LIFETIME,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_SECRET_LIFETIME,
    JWT_SECRET,
    JWT_SECRET_LIFETIME
} = require('../config/config');

module.exports = (action) => {
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: JWT_SECRET_LIFETIME });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_SECRET_LIFETIME });
    let activate_token = '';

    switch (action) {
        case 'activate': // !!!!!!!!!!!!!!!
            activate_token = jwt.sign({}, JWT_ACTIVATE_SECRET, { expiresIn: JWT_ACTIVATE_SECRET_LIFETIME });
            break;

        default: throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.WRONG_MAIL_ACTION);
    }
    return {
        access_token,
        refresh_token,
        activate_token
    };
};
