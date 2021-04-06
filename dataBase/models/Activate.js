const { Schema, model } = require('mongoose');

const activateSchema = new Schema({
    activate_token: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = model('Activate', activateSchema);
