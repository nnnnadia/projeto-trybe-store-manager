const Joi = require('joi');

const saleProductSchema = Joi.object({
  productId: Joi.number().integer().min(1).required()
    .messages({
      'any.required': '"productId" is required',
      'number.min': '"productId" must be greater than or equal to 1',
    }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

module.exports = {
  saleProductSchema,
};
