const router = require('express').Router();

// const apartmentRouter = require('./apartment.router');
const authRouter = require('./auth.router');
const homeRouter = require('./home.router');
const userRouter = require('./user.router');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/homes', homeRouter);
// router.use('./apartments', apartmentRouter);

module.exports = router;
