const jwt = require('jsonwebtoken')

const { secretKeys } = require('../config');

/**
 *
 * @param {*} json Convert json object to javascript object
 */
exports.toObject = (json) => JSON.parse(JSON.stringify(json));

/**
 *
 * @param {*} obj Pass object to generate jwt token
 */
exports.generateJwt = (obj) => jwt.sign(obj, secretKeys.jwt);

/**
 *
 * @param {*} string string who's first letter you want to capitalize
 */
exports.capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 *
 * @param {*} obj Source data object from which data needs to remove
 * @param {*} keys Keys that need to be delete
 * @param {*} defaultFields determine is default keys need to delete or not(Default: true)
 */
exports.removeFields = (obj, keys, isDefaultFields = true) => {
  const basicFields = ['createdAt', 'updatedAt', 'isDeleted', 'deletedBy', 'deletedAt', '__v'];
  keys = typeof keys == 'string' ? [keys] : keys || [];
  if (isDefaultFields) keys = keys.concat(basicFields);
  keys.forEach((key) => delete obj[key]);
  return obj;
};


/**
 * Check params env is current environment of node application
 * @param {String} env pass node environment name
 * @returns true or false
 */
exports.isNodeEnv = (env = []) => {
  env = typeof env === "string" ? [env] : env;
  return env.includes(process.env.NODE_ENV);
};
