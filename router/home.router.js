const router = require('express').Router();

const { homeController } = require('../controller');
// const { middleware } = require('../middlewares');

router.get('/', homeController.getAllHomes);
router.post('/', homeController.createHome);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', homeController.getHome);
router.delete('/:id', homeController.deleteHome);

module.exports = router;
