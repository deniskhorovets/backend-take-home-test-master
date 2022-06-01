const rideMock = (
  isFullObject=true,
  created = '2022-06-01 11:24:54',
  rideID = 1,
  riderName = 'Beth',
  driverName = 'Connor',
  driverVehicle = 'Honda'
) => ({
  ...(isFullObject && { rideID }),
  startLat: 1,
  startLong: 2,
  endLat: 3,
  endLong: 4,
  riderName,
  driverName,
  driverVehicle,
  ...(isFullObject && { created })
});

const rideRequestBodyMock = (
  rider_name = 'Beth',
  driver_name = 'Connor',
  driver_vehicle = 'Honda',
) => ({
  start_lat: 1,
  start_long: 2,
  end_lat: 3,
  end_long: 4,
  rider_name,
  driver_name,
  driver_vehicle
});

module.exports = {
  rideMock,
  rideRequestBodyMock
};
