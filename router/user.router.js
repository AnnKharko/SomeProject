const router = require('express').Router();

const { userController } = require('../controller');
// const { middleware } = require('../middlewares');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
