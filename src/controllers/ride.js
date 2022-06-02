const { errorResponse, validateRideBody } = require('../utils');

class RideController {
  constructor(RideService, logger=console.log) {
    this.ridesService = RideService;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.logger = logger;
  };

  async findAll(_req, res) {
    try {
      const rides = await this.ridesService.findAll();
      return res.send(rides);
    } catch (e) {
      res.status(500);
      return res.send(e);
    }
  };

  async findById(req, res) {
    const { id } = req.params;
    try {
      const ride = await this.ridesService.findById(id);
      return res.send(ride);
    } catch (e) {
      res.status(500);
      return res.send(e);
    }
  };

  async create(req, res) {
    try {
      const rideBody = {
        start_lat: Number(req.body.start_lat),
        start_long: Number(req.body.start_long),
        end_lat: Number(req.body.end_lat),
        end_long: Number(req.body.end_long),
        rider_name: req.body.rider_name,
        driver_name: req.body.driver_name,
        driver_vehicle: req.body.driver_vehicle
      };

      const rideBodyErrors = validateRideBody(rideBody);
      if (rideBodyErrors) {
        // this.logger.error(rideBodyErrors);
        res.status(500);
        return res.send(errorResponse(
          'VALIDATION_ERROR',
          rideBodyErrors
        ));
      }

      const ride = await this.ridesService.create(rideBody);
      return res.send(ride);
    } catch (e) {
      res.status(500);
      return res.send(e);
    }
  };
}

module.exports = RideController;
