const { Home } = require('../dataBase/models');

module.exports = {
    getAll: () => Home.find(),
    getById: (id) => Home.findById(id),
    createOne: (homeObject) => Home.create(homeObject),
    deleteById: (id) => Home.findByIdAndDelete(id)
};
