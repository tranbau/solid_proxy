const Joi = require("joi");

const schema = Joi.object({
  drugName: Joi.string().required,
  registerCode: Joi.string(),
  apothecapy: Joi.string().required,
  guilde: Joi.string().required,
  warning: Joi.string().required,
  category: Joi.string().required,
  standard: Joi.string().required,
  country: Joi.string().required,
  registerCompany: Joi.string().required,
});

module.exports = schema;
