const { constant, statusCodesEnum } = require('../constant');
const { userService } = require('../service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.getOne(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { body } = req;
            await userService.createOne(body);

            res.status(statusCodesEnum.CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            await userService.deleteOne(id);

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
