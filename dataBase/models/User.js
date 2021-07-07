const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    password: { type: String, required: true }, // select: false
    wishlist: [{ type: String }],
    note: [{ type: String }]
},
{
    timestamps: true
});

module.exports = model('User', userSchema);
