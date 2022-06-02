const { commonRequestErrorException } = require('../utils');

class RideService {
  constructor(db, logger=console.log) {
    this.db = db;
    this.logger = logger;
  }

  async findAll() {
    const rides = await this.db.all('SELECT * FROM Rides');
    if (rides.rows.length === 0) {
      const errMessage = `Could not find any rides`;
      this.logger.error(errMessage);
      throw commonRequestErrorException(
        'RIDES_NOT_FOUND_ERROR', errMessage
      );
    }
  };

  async findById(id) {
    const ride = await this.db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
    if (ride.rows.length === 0) {
      const errMessage = `Could not find a ride with id ${id}`;
      this.logger.error(errMessage);
      throw commonRequestErrorException(
        'RIDES_NOT_FOUND_ERROR', errMessage
      );
    }
  }

  async create(ride) {
    const values = [
      ride.start_lat,
      ride.start_long,
      ride.end_lat,
      ride.end_long,
      ride.rider_name,
      ride.driver_name,
      ride.driver_vehicle
    ];
    await this.db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values
    );
    const result = await this.db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID); // TODO what is this last id
    return result.rows;
  }
};

module.exports = RideService;
