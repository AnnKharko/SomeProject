module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    AUTHORIZATION: 'Authorization',
    USER_IS_CREATED: 'USER IS CREATED',
    HOME_IS_CREATED: 'HOME IS CREATED',
    HOME_IS_DELETED: 'HOME IS DELETED',
    CAR_IS_CREATED: 'CAR IS CREATED',
    USER_IS_DELETED: 'USER IS DELETED',
    USER_IS_ACTIVATED: 'USER IS ACTIVATED',
    CAR_IS_DELETED: 'CAR IS DELETED',
    UNKNOWN_FILE: 'UNKNOWN FILE',
    NO_REPLY: 'no-reply@codemoto.io',
    CHECK_EMAIL: 'Check your inbox to activate your account.',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // .doc/.dot
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx  2007
    ],
    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ],

    STATUS_ENUM: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        BLOCKED: 'blocked'
    },
    ROLE_ENUM: {
        ADMIN: 'admin',
        REALTOR: 'realtor',
        USER: 'user'
    },
    LOG_ENUM: {
        REALTOR_LOGIN: 'realtor_login',
        REALTOR_LOGOUT: 'realtor_logout',
        REALTOR_CONFIRMED: 'realtor_confirmed',
        REALTOR_REGISTERED: 'realtor_registered',
        REALTOR_FORGOT_PASSWORD: 'realtor_forgot_password',
        REALTOR_RESET_PASSWORD: 'realtor_reset_password',
    },
};
