const router = require('express').Router();

const { houseController } = require('../controller');
// const { middleware } = require('../middlewares');

router.get('/', houseController.getHouses);
router.post('/', houseController.createHouse);

// router.use('/:id', middleware.checkIsPresent);
router.get('/:id', houseController.getHouse);
router.delete('/:id', houseController.deleteHouse);

module.exports = router;
