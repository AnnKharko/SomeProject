module.exports = {
    // NOT FOUND
    USER_NOT_FOUND: {
        customCode: 4040
    },
    NOT_EXIST_USER_WITH_SUCH_TOKEN: {
        customCode: 4041
    },
    NOT_EXIST_USER_WITH_SUCH_ID: {
        customCode: 4042
    },
    CREDENTIALS_NOT_DEFINED: {
        customCode: 4043,
        message: 'Root email credentials are not defined!'
    },
    // BAD REQUEST
    BAD_REQUEST: {
        customCode: 4000
    },
    WRONG_EMAIL_OR_PASSWORD: {
        customCode: 4001,
        message: 'Wrong email or password'
    },
    NOT_VALID_TOKEN: {
        customCode: 4002
    },
    NOT_VALID_REFRESH_TOKEN: {
        customCode: 4003
    },
    TOKEN_IS_REQUIRED: {
        customCode: 4004
    },
    REFRESH_TOKEN_IS_REQUIRED: {
        customCode: 4005
    },
    WRONG_MAIL_ACTION: { // ? 500
        customCode: 4006
    },
    NOT_VALID_ACTIVATE_TOKEN: {
        customCode: 4007
    },
    ACTIVATE_TOKEN_IS_REQUIRED: {
        customCode: 4008
    },
    RESET_PASSWORD_TOKEN_IS_REQUIRED: {
        customCode: 4009
    },
    NOT_VALID_RESET_PASSWORD_TOKEN: {
        customCode: 40010
    },
    NOT_VALID_FILE: {
        customCode: 40011
    },
    USER_ALREADY_REGISTERED: {
        customCode: 40012,
        message: 'User is already registered'
    },
    REALTOR_ALREADY_ACTIVATED: {
        customCode: 40013,
        message: 'Realtor is already activated'
    },
    // PAYLOAD_TOO_LARGE
    FILE_TOO_LARGE: {
        customCode: 4130,
        message: 'File too large'
    },
    //    NOT_ALLOWED
    ONLY_ONE_FILE_ALLOWED_UPLOAD: {
        customCode: 4051,
        message: 'Only one photo is  allowed to be upload'
    },
    THIS_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS MIMETYPE NOT ALLOWED'
    },
    THIS_PHOTO_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS PHOTO MIMETYPE NOT ALLOWED'
    },
    THIS_DOC_MIMETYPE_NOT_ALLOWED: {
        customCode: 4052,
        message: 'THIS DOC MIMETYPE NOT ALLOWED'
    },
    // FORBIDDEN
    FORBIDDEN: {
        customCode: 4030,
        message: 'Access denied'
    },
    // SERVER_ERROR
    WRONG_ACTION: {
        customCode: 5000
    },
};
