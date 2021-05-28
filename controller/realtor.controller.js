const { mailService, realtorService, uploadService } = require('../service');
const { constant, emailActionsEnum } = require('../constant');
const { normalizer, passwordHasher } = require('../helper');
const { statusCodesEnum } = require('../error');
const { SITE_URL } = require('../config/config');

module.exports = {
    getRealtors: async (req, res, next) => {
        try {
            const findRealtors = await realtorService.findAll();
            const realtors = await normalizer(findRealtors);

            res.json(realtors);
        } catch (e) {
            next(e);
        }
    },
    getRealtor: async (req, res, next) => {
        try {
            const { id } = req.params;

            const findRealtor = await realtorService.findOne(id);
            const realtor = await normalizer(findRealtor);
            res.json(realtor);
        } catch (e) {
            next(e);
        }
    },
    createRealtor: async (req, res, next) => {
        try {
            const {
                body: { password, email, name },
                avatar, docs, videos
            } = req;

            const hashPassword = await passwordHasher.hash(password);
            const { realtor, token } = await realtorService.createOne({ ...req.body, password: hashPassword });

            if (avatar) {
                await uploadService.realtorUploadDirBuilder(avatar, realtor._id, 'photo');
            }

            if (docs) {
                for (const doc of docs) { // TODO ADD MORE THAN 1 DOC
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.realtorUploadDirBuilder(doc, realtor._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.realtorUploadDirBuilder(video, realtor._id, 'video');
                }
            }

            await mailService.sendMail(email, emailActionsEnum.ACTIVATE, { userName: name, siteURL: SITE_URL, token });

            res.status(statusCodesEnum.CREATED).json(constant.CHECK_EMAIL);
        } catch (e) {
            next(e);
        }
    },
    deleteRealtor: async (req, res, next) => {
        try {
            const { id } = req.params;
            const authId = req.infoTokens;
            const { email, name } = req.userInfo;

            await realtorService.deleteOne(id, authId);
            await mailService.sendMail(email, emailActionsEnum.USER_DELETED, { userName: name });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    },
    activateUser: async (req, res, next) => {
        try {
            const { user, _id } = req.activeInfo;

            await realtorService.activateOne(user._id, _id);
            await mailService.sendMail(user.email, emailActionsEnum.WELCOME, { userName: user.name });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_ACTIVATED);
        } catch (e) {
            next(e);
        }
    }
};
