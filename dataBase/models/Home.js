const { Schema, model } = require('mongoose');

const areaSchema = new Schema({
    totalArea: { type: Number, required: true },
    livingSpace: { type: Number, required: true },
    kitchenArea: { type: Number, required: true }
});

const homeSchema = new Schema({
    // home: { type: String, required: true },
    house: { type: Boolean, default: false },
    apartment: { type: Boolean },
    price: { type: Number, required: true },
    pricePerM2: { type: Number, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    // lane: { type: String },
    // square: { type: String },
    buildingType: { type: String, required: true },
    WallMaterial: { type: String, required: true },
    numberOfFloors: { type: Number },
    floor: { type: Number },
    numberOfRooms: { type: Number, required: true },
    houseArea: areaSchema,
    landArea: { type: Number },
    photos: [{ type: String }],
    docs: [{ type: String }],
    videos: [{ type: String }],
    createdAt: { type: Date, default: Date.now() }
}, { timestamps: true });

module.exports = model('Home', homeSchema);
