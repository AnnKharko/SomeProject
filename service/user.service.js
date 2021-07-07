const { User } = require('../dataBase/models');

module.exports = {
    getAll: () => User.find(),
    getOne: (id) => User.findById(id),
    createOne: (createObject) => User.create(createObject),
    deleteOne: (id) => User.findByIdAndDelete(id),
    updateOne: (id, updateObject) => User.findByIdAndUpdate(id, updateObject)
};
