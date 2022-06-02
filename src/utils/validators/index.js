const rideBodyValidators = require('./ride-body-validator');
const commonValidators = require('./common-validators');

module.exports = {
  ...rideBodyValidators,
  ...commonValidators
};

