const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('O_Auth', oAuthSchema);
