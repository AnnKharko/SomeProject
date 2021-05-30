const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    activate_token: { type: String },
    access_token: { type: String },
    refresh_token: { type: String },
    realtor: { type: Schema.Types.ObjectId, ref: 'Realtor' },
}, { timestamps: true });

module.exports = model('O_Auth', oAuthSchema);
