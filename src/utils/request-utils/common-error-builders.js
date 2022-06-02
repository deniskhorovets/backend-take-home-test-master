const commonRequestError = (errorCode, message) => ({
  error_code: errorCode,
  message
});

const internalServerErrorException = () => ({
  error_code: 'SERVER_ERROR',
  status_code: 500,
  message: 'Unknown error'
});

module.exports = {
  commonRequestError,
  internalServerErrorException
};
