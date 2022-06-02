const commonRequestErrorException = (code, message) => ({
  error_code: code,
  message
});

const internalServerErrorException = () => ({
  error_code: 'SERVER_ERROR',
  status_code: 500,
  message: 'Unknown error'
});

module.exports = {
  commonRequestErrorException,
  internalServerErrorException
};
