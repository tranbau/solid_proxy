const schemas = require('./schemas');

module.exports = (schemaName) => (req, res, next) => {
  const schema = schemas[schemaName] || null;
  if (!schema) {
    return res.sendStatus(500);
  }

  const { error } = schema.validate(req.body);
  if (error) {
    return res.sendStatus(400);
  }

  return next();
};