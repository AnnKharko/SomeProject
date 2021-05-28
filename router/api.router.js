const router = require('express').Router();

const authRouter = require('./auth.router');
const homeRouter = require('./home.router');
const realtorRouter = require('./realtor.router');

router.use('/realtors', realtorRouter);
router.use('/auth', authRouter);
router.use('/homes', homeRouter);

module.exports = router;
