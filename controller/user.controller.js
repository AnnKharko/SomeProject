const { userService } = require('../service');
const { constant } = require('../constant');
const { normalizer, passwordHasher } = require('../helper');
const { statusCodesEnum } = require('../error');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const findUsers = await userService.findUsers();
            const users = await normalizer(findUsers);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const findUser = await userService.findOne(id);
            const user = await normalizer(findUser);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHasher.hash(password);
            await userService.createOne({ ...req.body, password: hashPassword });

            res.status(statusCodesEnum.CREATED).json(constant.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const authId = req.infoTokens;

            await userService.deleteOne(id, authId);

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
