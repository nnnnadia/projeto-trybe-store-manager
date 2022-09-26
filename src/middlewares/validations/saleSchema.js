const Joi = require('joi');
const { saleProductSchema } = require('./saleProductSchema');

const saleSchema = Joi.array().items(saleProductSchema);

module.exports = {
  saleSchema,
};
