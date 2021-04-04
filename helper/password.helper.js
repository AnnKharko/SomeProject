const bcrypt = require('bcrypt');
const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordsEquel = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsEquel) {
            throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
