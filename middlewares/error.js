const { ValidationError } = require("express-validation");

const APIError = require('../utils/APIError');
const { isNodeEnv } = require('../utils/helper');
const { NODE_ENV } = require('../utils/enums');

const getErrorMessages = (error) => {
  error = error.details;
  if (error.params) return error.params[0].message;
  if (error.query) return error.query[0].message;
  if (error.body) return error.body[0].message;
}

exports.handler = (err, req, res, next) => {
  let message = err.message || "Something went wrong. Please try again later.";
  if (!err.isPublic) {
    err.status = 500;
    message = "Something went wrong. Please try again later.";
  }
  if (isNodeEnv(NODE_ENV.DEVELOPMENT)) {
    if (err.stack) console.log(err.stack);
    if (err.errors) console.log(err.errors);
  }
  return res.sendJson(err.status, message);
};

exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof ValidationError) {
    convertedError = new APIError({ status: 422, message: getErrorMessages(err) });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({ status: err.status, message: err.message, stack: err.stack });
  }
  return this.handler(convertedError, req, res);
};

exports.notFound = (req, res, next) => {
  const err = new APIError({ message: 'Not Found', status: 404 });
  return this.handler(err, req, res);
};