const { homeService } = require('../service');
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
            const { body } = req;

            await homeService.createOne(body);

            res.status(statusCodesEnum.CREATED).json(constant.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },
    deleteHome: async (req, res, next) => {
        try {
            const { id } = req.params;

            await homeService.deleteById(id);

            res.status(statusCodesEnum.OK).json(constant.USER_IS_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
