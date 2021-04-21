const router = require('express').Router();

const { apartmentController } = require('../controller');
// const { middleware } = require('../middlewares');

router.get('/', apartmentController.getApartments);
router.post('/', apartmentController.createApartment);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', apartmentController.getApartment);
router.delete('/:id', apartmentController.deleteApartment);

module.exports = router;
