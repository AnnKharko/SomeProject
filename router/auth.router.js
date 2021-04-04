const router = require('express').Router();

const { authController } = require('../controller');
// const { middleware } = require('../middlewares');

router.post('/', authController.authUser);
// router.post('/', controller.createUser);
//
// router.use('/:id', middleware.checkIsPresent);
// router.get('/:id', controller.getUser);
// router.delete('/:id', controller.delete);

module.exports = router;
