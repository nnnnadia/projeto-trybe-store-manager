const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const mapError = (errorType) => errorMap[errorType] || 500;

module.exports = { mapError, errorMap };
