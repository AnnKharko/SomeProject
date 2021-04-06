const { Activate, O_Auth, User } = require('../dataBase/models');
const { activateTokenizer } = require('../helper');

module.exports = {
    findUsers: () => {
        const users = User.find();

        return users;
    },
    findOne: (id) => {
        const user = User.findById({ _id: id });

        return user;
    },
    createOne: async (userObject) => {
        const token = await activateTokenizer();

        const user = await User.create(userObject);
        await Activate.create({ ...token, user: user._id });

        return token;
    },
    deleteOne: async (id, authId) => {
        await User.findByIdAndDelete({ _id: id });
        await O_Auth.findByIdAndDelete({ _id: authId });
    },
    activateOne: async (id) => {
        await User.findByIdAndUpdate(id, { active: true });
    }
};
