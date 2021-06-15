const { uploadService } = require('../service');

// eslint-disable-next-line complexity
module.exports = async (model, object, photos, docs, videos) => {
    switch (model) { //  error: "uploadFileDirBuilder is not a function"
        case 'realtor':
            const avatar = photos;

            if (avatar) {
                await uploadService.realtorUploadDirBuilder(avatar, object._id, 'photo');
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.realtorUploadDirBuilder(doc, object._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.realtorUploadDirBuilder(video, object._id, 'video');
                }
            }
            break;

        case 'home':
            if (photos) {
                for (const photo of photos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(photo, object._id, 'photo');
                }
            }

            if (docs) {
                for (const doc of docs) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(doc, object._id, 'doc');
                }
            }

            if (videos) {
                for (const video of videos) {
                    // eslint-disable-next-line no-await-in-loop
                    await uploadService.homeUploadDirBuilder(video, object._id, 'video');
                }
            }
    }
};

// module.exports = { addFileToDB };
