const { idSchema, saleSchema } = require('./validations/saleSchema');

const idValidation = (req, _res, next) => {
  const { id } = req.params;
  const { error } = idSchema.validate(id);
  if (error) next({ type: 'INVALID_VALUE', message: 'Invalid value' });
  next();
};

const saleValidation = (req, _res, next) => {
  const sales = req.body;
  const { error } = saleSchema.validate(sales);
  if (!error) return next();
  const { type, message } = error.details[0];
  if (type === 'any.required') next({ type: 'EMPTY_VALUE', message });
  if (type === 'number.min') next({ type: 'INVALID_VALUE', message });
  next();
};

module.exports = {
  idValidation,
  saleValidation,
};
