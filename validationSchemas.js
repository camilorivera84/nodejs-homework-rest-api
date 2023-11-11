const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().allow(null),
  phone: Joi.string().allow(null),
});

module.exports = {
  addContactSchema,
};
