const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', authMiddleware.checkAccessToken, userController.getUsers);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.use('/:id', authMiddleware.checkAccessToken);
router.get('/:id', userMiddleware.checkIsIdValid, userController.getUser);
router.delete('/:id', userMiddleware.checkIsIdValid, userController.deleteUser);

module.exports = router;
