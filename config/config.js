module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/realEstateDB',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_SECRET_LIFETIME: process.env.JWT_SECRET_LIFETIME || '10m',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    JWT_REFRESH_SECRET_LIFETIME: process.env.JWT_REFRESH_SECRET_LIFETIME || '30d',
    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || 'ACTIVATE_SECRET',
    JWT_ACTIVATE_SECRET_LIFETIME: process.env.JWT_ACTIVATE_SECRET_LIFETIME || '1d',

    JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET || 'RESET_PASSWORD_SECRET',
    JWT_RESET_PASSWORD_SECRET_LIFETIME: process.env.JWT_RESET_PASSWORD_SECRET_LIFETIME || '5m',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || '',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',
    SENTRY_DSN: process.env.SENTRY_DSN || '',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 1000
    }
};
