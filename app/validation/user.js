const Joi = require('joi');

const createUser = Joi.object({
  fistName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  designation: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = {
  createUser,
};
