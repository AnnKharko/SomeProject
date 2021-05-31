const router = require('express').Router();

const { realtorController } = require('../controller');
const {
    authMiddleware, realtorMiddleware, uploadMiddleware, validatorMiddleware
} = require('../middleware');

router.get('/', realtorController.getRealtors);
router.post('/',
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
router.get('/:id', realtorController.getRealtor);
router.delete('/:id', authMiddleware.checkAccessToken, realtorController.deleteRealtor);

module.exports = router;
