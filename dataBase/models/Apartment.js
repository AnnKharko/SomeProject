const { Schema, model } = require('mongoose');

const areaSchema = new Schema({
    totalArea: { type: Number, required: true },
    livingSpace: { type: Number, required: true },
    kitchenArea: { type: Number, required: true }
});

const apartmentSchema = new Schema({
    price: { type: Number, required: true },
    pricePerM2: { type: Number, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    // lane: { type: String },
    // square: { type: String },
    buildingType: { type: String, required: true },
    newHomes: { type: String },
    typeOfPlanning: { type: String, required: true },
    WallMaterial: { type: String, required: true },
    typeOfHeating: { type: String, required: true },
    floor: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    area: areaSchema,
    balcony: { type: Number },
    photos: [{ type: String }],
    docs: [{ type: String }],
    videos: [{ type: String }]
});

module.exports = model('Apartment', apartmentSchema);
