const { O_Auth, User } = require('../dataBase/models');

module.exports = {
    findUsers: () => {
        const users = User.find();

        return users;
    },
    findOne: (id) => {
        const user = User.findById({ _id: id });

        return user;
    },
    createOne: (userObject) => User.create(userObject),
    deleteOne: async (id, authId) => {
        await User.findByIdAndDelete({ _id: id });
        await O_Auth.findByIdAndDelete({ _id: authId });
    }
};
