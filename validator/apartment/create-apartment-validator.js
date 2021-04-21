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
    buildingType: Joi.string().when('newHomes', { is: false, then: Joi.required() }),
    newHomes: Joi.string().when('buildingType', { is: false, then: Joi.required() }),
    WallMaterial: { type: String, required: true },
    floor: Joi.number().integer().min(1).required(),
    numberOfRooms: Joi.number().integer().min(1).required(),
    area: areaSubSchema,
    balcony: Joi.number().integer().min(0).required(),
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
