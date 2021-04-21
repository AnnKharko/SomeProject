module.exports = {
    getHouses: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    getHouse: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    createHouse: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    },
    deleteHouse: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    }
};
