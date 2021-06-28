const { homeService, logService, uploadService } = require('../service');
const { constant, statusCodesEnum } = require('../constant');

module.exports = {
    getAllHomes: async (req, res, next) => {
        try {
            // const { body } = req;
            const homes = await homeService.getAll();

            res.json(homes);
        } catch (e) {
            next(e);
        }
    },
    getHome: (req, res, next) => {
        try {
            const { home } = req;

            res.json(home);
        } catch (e) {
            next(e);
        }
    },
    createHome: async (req, res, next) => {
        try {
            const {
                body, photos, docs, videos, realtorId: { _id }
            } = req;

            const home = await homeService.createOne({ ...body, realtor: _id });

            if (photos) {
                for (const photo of photos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(photo, home._id, 'photo');
                }
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(doc, home._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(video, home._id, 'video');
                }
            }

            await logService.createLog({ event: constant.LOG_ENUM.CREATE_HOME, realtorId: _id });

            res.status(statusCodesEnum.CREATED).json(constant.HOME_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteHome: async (req, res, next) => {
        try {
            const { params: { id }, realtorId: { _id } } = req;

            await homeService.deleteById(id);

            await logService.createLog({ event: constant.LOG_ENUM.DELETE_HOME, realtorId: _id });

            res.status(statusCodesEnum.OK).json(constant.HOME_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
