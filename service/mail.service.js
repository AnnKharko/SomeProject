const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../email-templates');
const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD } = require('../config/config');
const { NO_REPLY } = require('../constant/constant');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.WRONG_MAIL_ACTION);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: NO_REPLY,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
