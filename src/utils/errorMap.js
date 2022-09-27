const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  EMPTY_VALUE: 400,
  INVALID_VALUE: 422,
};

const mapError = (errorType) => errorMap[errorType] || 500;

module.exports = { mapError, errorMap };
