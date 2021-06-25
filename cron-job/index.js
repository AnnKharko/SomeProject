const cron = require('node-cron');
const removalDeadTokens = require('./removalDeadTokens');

module.exports = () => {
    cron.schedule('* * * * *', async () => {
        console.log('CRON RUN');
        await removalDeadTokens();
        console.log('CRON STOP');
    });
};
