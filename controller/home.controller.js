const { homeService, uploadService } = require('../service');
const { statusCodesEnum } = require('../error');
const { constant } = require('../constant');

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
    getHome: async (req, res, next) => {
        try {
            const { id } = req.params;

            const home = await homeService.getById(id);

            res.json(home);
        } catch (e) {
            next(e);
        }
    },
    createHome: async (req, res, next) => {
        try {
            const {
                body, photos, docs, videos
            } = req;

            const home = await homeService.createOne(body);

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

            res.status(statusCodesEnum.CREATED).json(constant.HOME_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteHome: async (req, res, next) => {
        try {
            const { id } = req.params;

            await homeService.deleteById(id);

            res.status(statusCodesEnum.OK).json(constant.HOME_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
