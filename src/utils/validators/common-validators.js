const isNotStringOrEmptyValidator = (str) => {
  return typeof str !== 'string' || str.length < 1;
};

module.exports = {
  isNotStringOrEmptyValidator
};
