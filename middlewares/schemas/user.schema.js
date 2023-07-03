const Joi = require('joi');

const schema = Joi.object({
    sessionInfo: Joi.object().required
});

module.exports = schema;