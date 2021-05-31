const router = require('express').Router();

const { realtorController } = require('../controller');
const { authMiddleware, uploadMiddleware, realtorMiddleware } = require('../middleware');

router.get('/', realtorController.getRealtors);
router.post('/',
    realtorMiddleware.checkIsEmailExists,
    uploadMiddleware.checkFile,
    uploadMiddleware.checkAvatar,
    realtorMiddleware.checkIsRealtorValid,
    realtorController.createRealtor);
router.post('/activate', authMiddleware.checkActivateToken, realtorController.activateRealtor);
router.post('/password/forgot', realtorMiddleware.checkIsRealtorExists, realtorController.forgotPassword);
router.post('/password/reset', authMiddleware.checkResetPasswordToken, realtorController.resetPassword);

// router.use('/:id', realtorMiddleware.checkIsIdValid);
router.get('/:id', realtorController.getRealtor);
router.delete('/:id', authMiddleware.checkAccessToken, realtorController.deleteRealtor);

module.exports = router;
