const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);

router.use('/:id', userMiddleware.checkIsIdValid);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
