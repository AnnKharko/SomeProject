module.exports = {
    checkIsHomeValid: (req, res, next) => {
        try {
            const { body } = req;

            res.json(body);
        } catch (e) {
            next(e);
        }
    }
};
