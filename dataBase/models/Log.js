const { Schema, model } = require('mongoose');

const logSchema = new Schema({
    event: { type: String, required: true },
    realtorId: { type: String, required: true },
    data: { type: Schema.Types.Mixed },
}, { timestamps: true });

module.exports = model('Log', logSchema);
