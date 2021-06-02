const Joi = require('joi');

// const areaSubSchema = Joi.object({
//     totalArea: Joi.number().required(),
//     livingSpace: Joi.number().required(),
//     kitchenArea: Joi.number().required()
// });

module.exports = Joi.object({
    // home: Joi.string().required(),
    house: Joi.boolean().when('apartment', { is: false, then: Joi.required() }),
    apartment: Joi.boolean(),
    price: Joi.number().integer().required(),
    pricePerM2: Joi.number().integer().required(),
    district: Joi.string().min(5).required(),
    street: Joi.string().when('lane', { is: false, then: Joi.required() }),
    lane: Joi.string(), // .when('street', { is: false, then: Joi.required() }),
    // square: Joi.string().when('street', { is: false, then: Joi.required() }),
    buildingType: Joi.string().required(),
    WallMaterial: Joi.string().required(),
    floor: Joi.number().integer().min(1).when('apartment', { is: true, then: Joi.required() }),
    numberOfFloors: Joi.number().integer().min(1).when('house', { is: true, then: Joi.required() }),
    numberOfRooms: Joi.number().integer().min(1).required(),
    // houseArea: areaSubSchema,     //  todo something wrong when crete home: not save houseArea
    totalArea: Joi.number().required(),
    livingSpace: Joi.number().required(),
    kitchenArea: Joi.number().required(),
    landArea: Joi.number().when('house', { is: true, then: Joi.required() }),
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
