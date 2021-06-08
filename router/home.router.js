const router = require('express').Router();

const { homeController } = require('../controller');
const {
    authMiddleware, accessMiddleware, homeMiddleware, uploadMiddleware
} = require('../middleware');

router.get('/', homeController.getAllHomes);
router.post('/',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkRole([
        'admin',
        'realtor'
    ]),
    uploadMiddleware.checkFile,
    homeMiddleware.checkIsHomeValid,
    homeController.createHome);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', homeController.getHome);
router.delete('/:id', homeController.deleteHome);

module.exports = router;
