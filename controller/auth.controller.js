const { authService } = require('../service');

module.exports = {
    authRealtor: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const tokens = await authService.authRealtor(email, password);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { realtor, _id } = req.tokenInfo;
            const tokens = await authService.refreshToken(realtor, _id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }

};
