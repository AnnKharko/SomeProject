const bcrypt = require('bcrypt');
const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hashPassword) => {
        const isPasswordsEquel = bcrypt.compare(password, hashPassword);

        if (!isPasswordsEquel) {
            throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
