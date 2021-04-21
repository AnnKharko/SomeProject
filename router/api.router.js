const router = require('express').Router();

const apartmentRouter = require('./apartment.router');
const authRouter = require('./auth.router');
const houseRouter = require('./house.router');
const userRouter = require('./user.router');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/houses', houseRouter);
router.use('./apartments', apartmentRouter);

module.exports = router;
