const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authController.authRealtor);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = router;
