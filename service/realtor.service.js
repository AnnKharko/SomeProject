const { O_Auth, Realtor } = require('../dataBase/models');
const { tokenizer } = require('../helper');
const { STATUS_ENUM, ROLE_ENUM } = require('../constant/constant');

module.exports = {
    findAll: () => Realtor.find(),
    findOne: (id) => Realtor.findById({ _id: id }),
    findOneByParams: (params) => Realtor.findOne(params),
    createOne: async (userObject) => {
        const { activate_token } = tokenizer('activate');

        const realtor = await Realtor.create(userObject);
        await O_Auth.create({ activate_token, realtor: realtor._id });

        return { realtor, activate_token };
    },
    deleteOne: async (id, authId) => {
        await Realtor.findByIdAndDelete({ _id: id });
        await O_Auth.findByIdAndDelete({ _id: authId });
    },
    activateOne: async (id, tokenId) => {
        await Realtor.findByIdAndUpdate(id, { status: STATUS_ENUM.CONFIRMED, role: ROLE_ENUM.REALTOR });
        await O_Auth.findByIdAndDelete({ _id: tokenId });
    },
    forgotPass: async (realtorId) => {
        const { reset_password_token } = tokenizer('reset_password');

        await O_Auth.create({ reset_password_token, realtor: realtorId });
        return reset_password_token;
    },
    resetPass: async (realtorId, newPassword, tokenId) => {
        await Realtor.findByIdAndUpdate(realtorId, { password: newPassword });
        await O_Auth.findByIdAndDelete(tokenId);
    }
};
