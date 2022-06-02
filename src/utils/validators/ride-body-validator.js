const { isNotStringOrEmptyValidator } = require('./common-validators');

const errorMessagesMap = {
  START_LATITUDE_ERROR: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  END_LATITUDE_ERROR: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
};

const emptyNameTemplate = (who) => `${who} name must be a non empty string`;

const validateRideBody = (rideBody) => {
  const errors = [];
  if (
    rideBody.start_lat < -90 ||
    rideBody.start_lat > 90 ||
    rideBody.start_long < -180 ||
    rideBody.start_long > 180
  ) {
    errors.push(errorMessagesMap.START_LATITUDE_ERROR);
  }
  if (
    rideBody.end_lat < -90 ||
    rideBody.end_lat > 90 ||
    rideBody.end_long < -180 ||
    rideBody.end_long > 180
  ) {
    errors.push(errorMessagesMap.END_LATITUDE_ERROR);
  }

  if (isNotStringOrEmptyValidator(rideBody.rider_name)) {
    errors.push(emptyNameTemplate(rideBody.rider_name));
  }

  if (isNotStringOrEmptyValidator(rideBody.driver_name)) {
    errors.push(emptyNameTemplate(rideBody.driver_name));
  }

  if (isNotStringOrEmptyValidator(rideBody.driver_vehicle)) {
    errors.push(emptyNameTemplate(rideBody.driver_vehicle));
  }

  return errors.length ? errors : null;
};

module.exports = {
  validateRideBody
};
