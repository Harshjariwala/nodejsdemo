const Joi = require('joi');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

exports.show = {
  params: Joi.object({
    id: JoiObjectId().required(),
  })
};

exports.create = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    nickName: Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
  })
}

exports.update = {
  params: Joi.object({
    id: JoiObjectId().required(),
  }),
  body: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    nickName: Joi.string().optional(),
    email: Joi.string().optional(),
    gender: Joi.string().optional(),
    dob: Joi.string().optional(),
  }).required().not({})
}

exports.destroy = {
  params: Joi.object({
    id: JoiObjectId(),
  })
};