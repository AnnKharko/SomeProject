module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/realEstateDB',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_SECRET_LIFETIME: process.env.JWT_SECRET_LIFETIME || '1m',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    JWT_REFRESH_SECRET_LIFETIME: process.env.JWT_REFRESH_SECRET_LIFETIME || '30d',
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || 'ACTIVATE_SECRET',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'ko@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '1234',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 1000
    }
};
