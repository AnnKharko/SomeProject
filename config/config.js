module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/someDB',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'someone.mail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'GCsrghhghi5htg5'
};
