const response = require('../response/index');
const httpStatus = require('http-status');
const model = require('../model');
const userServices = require('../services/user');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.createUser = async (req, res) => {
  try {
    const { User } = model;
    const { email, firstName, lastName, age, designation, city } = req.body;
    const details = {
      email,
      firstName,
      lastName,
      age,
      designation,
      city
    };
    const checkUser = await userServices.getByCondition(User, { email, isDeleted: false }, { _id: 0, email: 1 });
    if (checkUser) {
      return response.error(req, res, { msgCode: 'ALREADY_EXISTS' }, httpStatus.CONFLICT);
    }
    const creatUser = await userServices.create(User, details);
    if (!creatUser) {
      return response.error(req, res, { msgCode: 'CREATE_ERROR' }, httpStatus.FORBIDDEN);
    }
    return response.success(req, res, { msgCode: 'USER_ADDED', data: creatUser }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { User } = model;
    const { email, firstName, lastName, age, designation, city } = req.body;
    const { userId } = req.body;

    const userCondition = { _id: userId };
    const userDetails = await userServices.getByCondition(User, userCondition);
    if (!userDetails) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.CONFLICT);
    }
    const details = {
      email,
      firstName,
      lastName,
      age,
      designation,
      city
    };
    const updateUser = await userServices.updateByCondition(User, { _id: userId }, details);
    if (!updateUser) return response.error(req, res, { msgCode: 'UPDATE_ERROR' }, httpStatus.FORBIDDEN);

    return response.success(req, res, { msgCode: 'USER_UPDATED', data: updateUser }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { User } = model;
    const { userId } = req.query;

    const userCondition = { _id: userId };
    const userData = await userServices.getAll(User, userCondition);
    if (!userData) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.FORBIDDEN);
    }
    const msgCode = 'FOUND';
    return response.success(req, res, { msgCode, data: userData }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { User } = model;
    const userData = await userServices.getAll(User);
    if (!userData) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.FORBIDDEN);
    }
    const msgCode = 'FOUND';
    return response.success(req, res, { msgCode, data: userData }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { User } = model;
    const { userId } = req.body;

    const userCondition = { _id: new ObjectId(userId)};
    const userData = await userServices.removeById(User, userCondition);
    if (!userData) {
      return response.error(req, res, { msgCode: 'NOT_FOUND' }, httpStatus.FORBIDDEN);
    }
    const msgCode = 'FOUND';
    return response.success(req, res, { msgCode, data: {} }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};