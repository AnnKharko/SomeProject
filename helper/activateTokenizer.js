const jwt = require('jsonwebtoken');

const { JWT_ACTIVATE_SECRET } = require('../config/config');

module.exports = () => {
    const activate_token = jwt.sign({}, JWT_ACTIVATE_SECRET, { expiresIn: '1d' });

    return {
        activate_token
    };
};
