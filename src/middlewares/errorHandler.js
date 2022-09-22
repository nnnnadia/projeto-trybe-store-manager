const { mapError } = require('../utils/errorMap');

const errorHandler = ({ type, message }, _req, res, _next) => {
  const status = mapError(type);
  res.status(status).json({ message });
};

module.exports = errorHandler;
