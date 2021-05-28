const { Schema, model } = require('mongoose');
const { ROLE_ENUM, STATUS_ENUM } = require('../../constant/constant');

const realtorSchema = new Schema({
    name: { type: String, required: true },
    yearOfBorn: { type: Number, required: true }, // unique: true
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // select: false
    // active: { type: Boolean, default: false },
    status: { type: String, required: true, default: STATUS_ENUM.PENDING },
    role: { type: String, required: true, default: ROLE_ENUM.USER },
    phone: { type: String },
    avatar: { type: String },
    doc: [{ type: String }],
    video: [{ type: String }]
});

module.exports = model('Realtor', realtorSchema);
