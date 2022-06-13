const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

const { bcrypt } = require('../config');
const APIError = require('../utils/APIError');
const { removeFields } = require('../utils/helper');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  nickName: { type: String, require: true },
  dob: { type: Date, require: true },
  gender: { type: String, require: true },
  password: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, require: true },
},
  {
    timestamps: true,
  });

/**
*  Check email is unique or not
*/
UserSchema.pre(/^save$/, true, async function (next, done) {
  try {
    const self = this;
    const record = await mongoose.models['user'].findOne({ _id: { $ne: self._id }, email: self.email, isDeleted: false });
    record ? done(new APIError({ status: 409, message: `"email" already exists` })) : done();
    next();
  }
  catch (err) { done(err); next(); }
});

/**
*  Encrypt password
*/
UserSchema.pre(/^save$/, async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcryptJs.hash(this.password, parseInt(bcrypt.salt));
  this.password = hash;
  next();
});

/**
*  Delete not required fields
*/
UserSchema.methods.deleteFields = function (keys, defaultFields = true) {
  return removeFields(this.toObject(), keys, defaultFields);
};

/**
*  Password compare
*/
UserSchema.methods.isValidPassword = async function (password) {
  return await bcryptJs.compare(password, this.password);
};

module.exports = model('user', UserSchema, 'users');
