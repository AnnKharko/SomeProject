const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { passwordHasher, tokenizer } = require('../helper');
const { O_Auth, Realtor } = require('../dataBase/models');

module.exports = {
    authRealtor: async (email, password) => {
        const realtor = await Realtor.findOne({ email });

        if (!realtor) {
            throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.USER_NOT_FOUND);
        }

        await passwordHasher.compare(password, realtor.password);

        const { access_token, refresh_token } = tokenizer('authorization');
        await O_Auth.create({ access_token, refresh_token, realtor: realtor._id });

        return {
            access_token,
            refresh_token
        };
    },
    refreshToken: async (realtor, _id) => {
        const { access_token, refresh_token } = tokenizer('authorization');
        await O_Auth.findByIdAndUpdate(_id, { access_token, refresh_token, realtor });

        return {
            access_token,
            refresh_token
        };
    },
    removeTokens: (id) => O_Auth.findByIdAndDelete(id),
    getTokensByParams: (findObject) => O_Auth.find(findObject)
};
