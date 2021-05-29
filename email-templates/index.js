const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome in the Real Estate Agency'
    },
    [emailActionsEnum.USER_DELETED]: {
        templateName: 'realtor-deleted',
        subject: 'User was deleted'
    },
    [emailActionsEnum.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Activate realtor account'
    }
};
