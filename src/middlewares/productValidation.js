const {
  idSchema, nameSchema,
} = require('./validations/productSchemas');

const idValidation = (req, _res, next) => {
  const { id } = req.params;
  const { error } = idSchema.validate(id);
  if (error) next({ type: 'INVALID_VALUE', message: 'Invalid value' });
  next();
};

const nameValidation = (req, _res, next) => {
  const { name } = req.body;
  const { error: { details } } = nameSchema.validate(name);
  const { type } = details[0];
  if (!type) next();
  if (type === 'string.min') {
    next({ type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });
  }
  if (type === 'any.required') next({ type: 'EMPTY_VALUE', message: '"name" is required' });
};

module.exports = {
  idValidation,
  nameValidation,
};
