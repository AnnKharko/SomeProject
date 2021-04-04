const { User } = require('../dataBase/models');

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
    deleteOne: (id) => User.findByIdAndDelete({ _id: id })
};
