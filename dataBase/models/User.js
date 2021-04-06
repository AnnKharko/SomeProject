const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    yearOfBorn: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // select: false
    active: { type: Boolean, default: false },
    avatar: { type: String },
    doc: { type: String },
});

module.exports = model('User', userSchema);
