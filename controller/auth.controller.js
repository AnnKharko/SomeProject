const { authService } = require('../service');
const { statusCodesEnum } = require('../constant');

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
    },
    logoutRealtor: async (req, res, next) => {
        try {
            const { infoTokens } = req;

            await authService.removeTokens(infoTokens);

            res.sendStatus(statusCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }

};
