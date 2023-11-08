const db = require('../config/database').getUserDB();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
},
  {
    timestamps: true,
    versionKey: false
  }
);
const User = db.model('users', userSchema);

module.exports = User;
