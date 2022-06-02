const { commonRequestError } = require('../utils');

class RideService {
  constructor(db, logger=console.log) {
    this.db = db;
    this.logger = logger;
  };

  async findAll() {
    const rides = await this.db.allAsync('SELECT * FROM Rides');
    if (rides.length === 0) {
      const errMessage = `Could not find any rides`;
      this.logger.error(errMessage);
      throw commonRequestError(
        'RIDES_NOT_FOUND_ERROR', errMessage
      );
    }
    return rides;
  };

  async findById(id) {
    const ride = await this.db.allAsync(`SELECT * FROM Rides WHERE rideID='${id}'`);
    if (ride.length === 0) {
      const errMessage = `Could not find a ride with id ${id}`;
      this.logger.error(errMessage);
      throw commonRequestError(
        'RIDES_NOT_FOUND_ERROR', errMessage
      );
    }
    return ride;
  }

  async create(ride) {
    const values = Object.values(ride);
    const createdRide = await this.db.runAsync(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values
    );
    return this.findById(createdRide.lastID);
  }
};

module.exports = RideService;
