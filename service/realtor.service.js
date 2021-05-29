const { Activate, O_Auth, Realtor } = require('../dataBase/models');
const { activateTokenizer } = require('../helper');

module.exports = {
    findAll: () => Realtor.find(),
    findOne: (id) => Realtor.findById({ _id: id }),
    findOneByParams: (params) => Realtor.findOne(params),
    createOne: async (userObject) => {
        const token = await activateTokenizer();

        const realtor = await Realtor.create(userObject);
        await Activate.create({ ...token, user: realtor._id });

        return { realtor, token };
    },
    deleteOne: async (id, authId) => {
        await Realtor.findByIdAndDelete({ _id: id });
        await O_Auth.findByIdAndDelete({ _id: authId });
    },
    activateOne: async (id, tokenId) => {
        await Realtor.findByIdAndUpdate(id, { active: true });
        await Activate.findByIdAndDelete(tokenId);
    }
};
