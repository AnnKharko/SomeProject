const fs = require('fs/promises');
const { constant } = require('../constant');
const { uploadFileDirBuilder } = require('../helper');
const { Home, User } = require('../dataBase/models');

const userUploadDirBuilder = async (uploadFile, itemId, uploadType) => {
    const { filePath, fileDir, uploadPath } = uploadFileDirBuilder('user', uploadFile.name, uploadType, itemId);

    await fs.mkdir(fileDir, { recursive: true });

    await uploadFile.mv(filePath);

    switch (uploadType) {
        case 'photo':
            await User.updateOne({ _id: itemId }, { $set: { avatar: uploadPath } });
            break;
        case 'doc':
            await User.updateOne({ _id: itemId }, { $set: { doc: uploadPath } });
            break;
        case 'video':
            await User.updateOne({ _id: itemId }, { $set: { video: uploadPath } });
            break;
        default:
            console.log(constant.UNKNOWN_FILE);
    }
};
const homeUploadDirBuilder = async (uploadFile, itemId, uploadType) => {
    const { filePath, fileDir, uploadPath } = uploadFileDirBuilder('home', uploadFile.name, uploadType, itemId);
    // console.log(fileDir);
    // console.log(filePath);
    await fs.mkdir(fileDir, { recursive: true });

    await uploadFile.mv(filePath);

    switch (uploadType) {
        case 'photo':
            await Home.updateOne({ _id: itemId }, { $set: { photos: uploadPath } });
            break;
        case 'doc':
            await Home.updateOne({ _id: itemId }, { $set: { docs: uploadPath } });
            break;
        case 'video':
            await Home.updateOne({ _id: itemId }, { $set: { videos: uploadPath } });
            break;
        default:
            console.log(constant.UNKNOWN_FILE);
    }
};

module.exports = { userUploadDirBuilder, homeUploadDirBuilder };
