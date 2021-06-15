const { Schema, model } = require('mongoose');

// const areaSubSchema = new Schema({
//     totalArea: { type: Number, required: true },
//     livingSpace: { type: Number, required: true },
//     kitchenArea: { type: Number, required: true }
// });

const homeSchema = new Schema({
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
    // houseArea: areaSubSchema, //  todo something wrong when crete home: not save houseArea
    totalArea: { type: Number, required: true },
    livingSpace: { type: Number, required: true },
    kitchenArea: { type: Number, required: true },
    landArea: { type: Number },
    photos: [{ type: String }],
    docs: [{ type: String }],
    videos: [{ type: String }],
    description: { type: String, required: true },
    tags: [{ type: String }],
    realtor: { type: Schema.Types.ObjectId, ref: 'Realtor' },
}, { timestamps: true });

module.exports = model('Home', homeSchema);
