const Joi = require('joi');

const createUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  designation: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().required(),
});

const updateUser = Joi.object({
  userId: Joi.string().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  age: Joi.number().optional(),
  designation: Joi.string().optional(),
  city: Joi.string().optional(),
  email: Joi.string().optional(),
});

const getUserById = Joi.object({
  userId: Joi.string().required(),
});

const deleteUser = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser
};
