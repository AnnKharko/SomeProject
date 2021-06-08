const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, realtorMiddleware, validatorMiddleware } = require('../middleware');

router.post('/',
    validatorMiddleware.loginValidate,
    realtorMiddleware.checkIsRealtorExists,
    realtorMiddleware.chekIsRealtorConfirmed,
    authController.authRealtor);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logoutRealtor);

module.exports = router;
