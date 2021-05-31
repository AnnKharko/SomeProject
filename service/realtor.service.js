const { O_Auth, Realtor } = require('../dataBase/models');
const { tokenizer } = require('../helper');
const { STATUS_ENUM } = require('../constant/constant');

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
        await Realtor.findByIdAndUpdate(id, { status: STATUS_ENUM.CONFIRMED });
        await O_Auth.findByIdAndDelete({ _id: tokenId });
    }
};
