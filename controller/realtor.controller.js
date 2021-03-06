const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    logService, mailService, realtorService, uploadService
} = require('../service');
const { constant, emailActionsEnum, statusCodesEnum } = require('../constant');
const { normalizer, passwordHasher } = require('../helper');

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
            const { realtor, activate_token } = await realtorService.createOne({ ...req.body, password: hashPassword });

            if (avatar) {
                await uploadService.realtorUploadDirBuilder(avatar, realtor._id, 'photo');
            }

            // ''''''''''''''''''''''''''''''''''
            // await addFileToDB('realtor', realtor, avatar, docs, videos); // TODO additional function for updating db
            // ''''''''''''''''''''''''''''''''''

            if (docs) {
                for (const doc of docs) {
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

            await mailService.sendMail(email, emailActionsEnum.ACTIVATE, { realtorName: name, token: activate_token });
            await logService.createLog({ event: constant.LOG_ENUM.REALTOR_REGISTERED, realtorId: realtor._id });

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
    activateRealtor: async (req, res, next) => {
        try {
            const { realtor, _id } = req.activeInfo;

            if (realtor.status !== constant.STATUS_ENUM.PENDING) { // additional
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.REALTOR_ALREADY_ACTIVATED));
            }

            await realtorService.activateOne(realtor._id, _id);
            await mailService.sendMail(realtor.email, emailActionsEnum.WELCOME, { realtorName: realtor.name });
            await logService.createLog({ event: constant.LOG_ENUM.REALTOR_CONFIRMED, realtorId: realtor._id });

            res.status(statusCodesEnum.OK).json(constant.USER_IS_ACTIVATED);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { _id, email, name } = req.realtor;
            const token = await realtorService.forgotPass(_id);

            await mailService.sendMail(email, emailActionsEnum.RESET_PASSWORD, { realtorName: name, token });
            await logService.createLog({ event: constant.LOG_ENUM.REALTOR_FORGOT_PASSWORD, realtorId: _id });

            res.end();
        } catch (e) {
            next(e);
        }
    },
    resetForgotPassword: async (req, res, next) => {
        try {
            const { resPasswordInfo: { _id, realtor }, body: { password } } = req;

            const hashPassword = await passwordHasher.hash(password);
            await realtorService.resetForgotPass(realtor._id, hashPassword, _id);
            await mailService.sendMail(
                realtor.email,
                emailActionsEnum.SUCCESSFULLY_RESET_PASSWORD,
                { realtorName: realtor.name }
            );
            await logService.createLog({ event: constant.LOG_ENUM.REALTOR_RESET_PASSWORD, realtorId: realtor._id });

            res.end();
        } catch (e) {
            next(e);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const { realtorId: { _id }, body: { newPassword } } = req;

            const hashPassword = await passwordHasher.hash(newPassword);
            await realtorService.resetPass(_id, hashPassword);

            await logService.createLog({ event: constant.LOG_ENUM.REALTOR_RESET_PASSWORD, realtorId: _id });

            res.end();
        } catch (e) {
            next(e);
        }
    }
};
