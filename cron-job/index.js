const cron = require('node-cron');
const removalDeadTokens = require('./removalDeadTokens');

module.exports = () => {
    cron.schedule('0 1 * * *', async () => {
        console.log('CRON RUN');
        await removalDeadTokens();
        console.log('CRON STOP');
    });
};
