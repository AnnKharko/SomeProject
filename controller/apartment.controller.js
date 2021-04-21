module.exports = {
    getApartments: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    getApartment: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    createApartment: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    deleteApartment: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    }
};
