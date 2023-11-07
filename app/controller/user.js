const response = require('../response/index');
const httpStatus = require('http-status');
const model = require('../model');
const userServices = require('../services/user');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const moment = require('moment-timezone');

exports.createUser = async (req, res) => {
  try {
    const { User } = model;
    const { email, firstName, lastName, age, designation, city } = req.body;
    const details = {
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
    return response.success(req, res, { msgCode: 'USER_ADDED', result: creatUser }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { User } = model;
    const { userName, email, profilePic, gender, state, dob } = req.body;
    const { userId } = req.data;
    if (email) {
      const checkUser = await commonService.getByCondition(User, { _id: { $ne: userId }, email, isDeleted: false }, { _id: 0, email: 1 });
      if (checkUser) return response.error(req, res, { msgCode: 'PROFILE_ALREADY_EXISTS' }, httpStatus.CONFLICT);
    }
    const userDetails = await commonService.getByCondition(User, { _id: userId }, { _id: 0, email: 1 });
    const details = { userName, email, dob, profilePic, gender, state };
    if (userDetails.email !== email) details.isEmailVerified = false;
    const updateProfile = await commonService.updateByCondition(User, { _id: userId }, details);
    if (!updateProfile) return response.error(req, res, { msgCode: 'UPDATE_ERROR' }, httpStatus.FORBIDDEN);
    const resData = {
      id: updateProfile._id,
      userName: updateProfile.userName || '',
      phoneNumber: updateProfile.phoneNumber,
      email: updateProfile.email || '',
      dob: updateProfile.dob || '',
      profilePic: updateProfile.profilePic || '',
      gender: updateProfile.gender || '',
      state: updateProfile.state || '',
      totalCoins: updateProfile.totalCoins || 0,
      createdAt: updateProfile.createdAt
    };
    return response.success(req, res, { msgCode: 'PROFILE_UPDATED', data: resData }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.myProfile = async (req, res) => {
  try {
    const { User } = model;
    const { userId } = req.data;
    const project = {
      _id: 1,
      userName: 1,
      phoneNumber: 1,
      email: 1,
      dob: 1,
      profilePic: 1,
      gender: 1,
      state: 1,
      totalCoins: 1,
      createdAt: 1
    };
    const myProfile = await commonService.getUserProfile(User, { _id: userId }, project);
    if (!myProfile) {
      return response.error(req, res, { msgCode: 'FAILED_TO_UPDATE' }, httpStatus.FORBIDDEN);
    }
    const resData = {
      id: myProfile._id,
      userName: myProfile.userName || '',
      phoneNumber: myProfile.phoneNumber,
      email: myProfile.email || '',
      dob: myProfile.dob || '',
      profilePic: myProfile.profilePic || '',
      gender: myProfile.gender || '',
      state: myProfile.state || '',
      totalCoins: myProfile.totalCoins || 0,
      createdAt: myProfile.createdAt
    };
    const msgCode = 'USER_PROFILE';
    return response.success(req, res, { msgCode, data: resData }, httpStatus.OK);
  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.skipProfile = async (req, res) => {
  try {
    const { isSkip } = req.body;
    const { User } = model;
    const { userId } = req.data;
    if (isSkip === true || isSkip === 'true') {
      const checkSkip = await commonService.getByCondition(User, { _id: userId });
      if (checkSkip.isSkip === true) {
        return response.error(req, res, { msgCode: 'ALREADY_SKIPPED' }, httpStatus.FORBIDDEN);
      }
      const skipData = await commonService.updateByCondition(User, { _id: userId }, { isSkip: true });
      if (!skipData) {
        return response.error(req, res, { msgCode: 'NOT_SKIPPED' }, httpStatus.FORBIDDEN);
      }
      return response.success(req, res, { msgCode: 'SKIPPED', data: {} }, httpStatus.OK);
    }
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};