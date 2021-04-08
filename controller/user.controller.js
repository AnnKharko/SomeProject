const { mailService, userService } = require('../service');
const { constant, emailActionsEnum } = require('../constant');
const { normalizer, passwordHasher } = require('../helper');
const { statusCodesEnum } = require('../error');
const { SITE_URL } = require('../config/config');

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
            const {
                body: { password, email, name },
                // avatar, docs, videos
            } = req;

            const hashPassword = await passwordHasher.hash(password);
            const { user, token } = await userService.createOne({ ...req.body, password: hashPassword });
            console.log('|||||||||||||||||||||||||');
            console.log(user);
            console.log('|||||||||||||||||||||||||');
            console.log(token);

            await mailService.sendMail(email, emailActionsEnum.ACTIVATE, { userName: name, siteURL: SITE_URL, token });

            res.status(statusCodesEnum.CREATED).json(constant.CHECK_EMAIL);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const authId = req.infoTokens;
            const { email, name } = req.userInfo;

            await userService.deleteOne(id, authId);
            await mailService.sendMail(email, emailActionsEnum.USER_DELETED, { userName: name });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    },
    activateUser: async (req, res, next) => {
        try {
            const { user, _id } = req.activeInfo;

            await userService.activateOne(user._id, _id);
            await mailService.sendMail(user.email, emailActionsEnum.WELCOME, { userName: user.name });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_ACTIVATED);
        } catch (e) {
            next(e);
        }
    }
};
