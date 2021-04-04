const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { passwordHasher, tokenizer } = require('../helper');
const { O_Auth, User } = require('../dataBase/models');

module.exports = {
    authUser: async (email, password) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.USER_NOT_FOUND);
        }

        await passwordHasher.compare(password, user.password);

        const tokens = tokenizer();
        await O_Auth.create({ ...tokens, user: user._id });

        return tokens;
    },
    refreshToken: async (user, _id) => {
        const tokens = tokenizer();
        await O_Auth.findByIdAndUpdate(_id, { ...tokens, user });

        return tokens;
    }
};
