const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, uploadMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getUsers);
router.post('/',
    uploadMiddleware.checkFile,
    uploadMiddleware.checkAvatar,
    userMiddleware.checkIsUserValid,
    userController.createUser);
router.post('/activate', authMiddleware.checkActivateToken, userController.activateUser);

router.use('/:id', userMiddleware.checkIsIdValid);
router.get('/:id', userController.getUser);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
