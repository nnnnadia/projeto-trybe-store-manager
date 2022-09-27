const Joi = require('joi');
const { saleProductSchema } = require('./saleProductSchema');

const idSchema = Joi.number().integer().min(1).required();
const saleSchema = Joi.array().items(saleProductSchema);

module.exports = {
  idSchema,
  saleSchema,
};
