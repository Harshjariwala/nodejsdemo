const assert = require('assert');

module.exports = (Joi, message = 'valid id') => {
  assert(Joi && Joi.object, 'You must pass Joi as an argument');

  if (!message || !(typeof message === 'string')) message = 'valid mongo id';

  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
  };
};