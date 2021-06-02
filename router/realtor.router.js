const router = require('express').Router();

const { constant } = require('../constant');
const { realtorController } = require('../controller');
const {
    accessMiddleware, authMiddleware, realtorMiddleware, uploadMiddleware, validatorMiddleware
} = require('../middleware');

router.get('/', realtorController.getRealtors);
router.post('/',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkRole([constant.ROLE_ENUM.ADMIN]),
    realtorMiddleware.checkIsEmailExists,
    uploadMiddleware.checkFile,
    uploadMiddleware.checkAvatar,
    realtorMiddleware.checkIsRealtorValid,
    realtorController.createRealtor);
router.post('/activate', authMiddleware.checkActivateToken, realtorController.activateRealtor);
router.post('/password/forgot',
    validatorMiddleware.emailValidate,
    realtorMiddleware.checkIsRealtorExists,
    realtorController.forgotPassword);
router.post('/password/reset',
    authMiddleware.checkResetPasswordToken,
    validatorMiddleware.passwordValidate,
    realtorController.resetPassword);

// router.use('/:id', realtorMiddleware.checkIsIdValid); // сприймає усі інші endpoint як id !!!
router.get('/:id', realtorMiddleware.checkIsIdValid, realtorController.getRealtor);
router.delete('/:id', authMiddleware.checkAccessToken, realtorController.deleteRealtor);

module.exports = router;
