const router = require('express').Router();

const { homeController } = require('../controller');
const { uploadMiddleware } = require('../middleware');

router.get('/', homeController.getAllHomes);
router.post('/', uploadMiddleware.checkFile, homeController.createHome);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', homeController.getHome);
router.delete('/:id', homeController.deleteHome);

module.exports = router;
