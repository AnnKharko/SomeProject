const router = require('express').Router();

const authRouter = require('./auth.router');
const homeRouter = require('./home.router');
const realtorRouter = require('./realtor.router');
const userRouter = require('./user.router');

router.use('/realtors', realtorRouter);
router.use('/auth', authRouter);
router.use('/homes', homeRouter);
router.use('/users', userRouter);

module.exports = router;
