const router = require('express').Router();

const { realtorController } = require('../controller');
const { authMiddleware, uploadMiddleware, realtorMiddleware } = require('../middleware');

router.get('/', realtorController.getRealtors);
router.post('/',
    uploadMiddleware.checkFile,
    uploadMiddleware.checkAvatar,
    realtorMiddleware.checkIsRealtorValid,
    realtorController.createRealtor);
router.post('/activate', authMiddleware.checkActivateToken, realtorController.activateUser);

router.use('/:id', realtorMiddleware.checkIsIdValid);
router.get('/:id', realtorController.getRealtor);
router.delete('/:id', authMiddleware.checkAccessToken, realtorController.deleteRealtor);

module.exports = router;
