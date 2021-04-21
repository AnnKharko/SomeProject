const Joi = require('joi');

const areaSubSchema = Joi.object({
    totalArea: Joi.number().required(),
    livingSpace: Joi.number().required(),
    kitchenArea: Joi.number().required()
});

module.exports = Joi.object({

    price: Joi.number().integer().required(),
    pricePerM2: Joi.number().integer().required(),
    district: Joi.string().min(5).required(),
    street: Joi.string().when('lane', { is: false, then: Joi.required() }),
    lane: Joi.string().when('street', { is: false, then: Joi.required() }),
    // square: Joi.string().when('street', { is: false, then: Joi.required() }),
    buildingType: { type: String, required: true },
    WallMaterial: { type: String, required: true },
    numberOfFloors: Joi.number().integer().min(1).required(),
    numberOfRooms: Joi.number().integer().min(1).required(),
    houseArea: areaSubSchema,
    landArea: Joi.number().required(),
    photos: Joi.array().items({
        photo: Joi.string().alphanum()
    }),
    docs: Joi.array().items({
        doc: Joi.string().alphanum()
    }),
    videos: Joi.array().items({
        video: Joi.string().alphanum()
    })
});
