const { commonRequestError } = require('./common-error-builders');

const errorResponse = (errorCode, message) => {
  // TODO add status code etc
  return commonRequestError(errorCode, message);
};

module.exports = {
  errorResponse
};

