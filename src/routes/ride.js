const expressRouter = require('express').Router;
const { RideController } = require('../controllers');
const { RideService } = require('../services');
const { logger } = require('../utils');

module.exports = (db) => {
  const rideService = new RideService(db, logger);
  const rideController = new RideController(rideService, logger);

  const router = expressRouter();
  router
    .route('/')
    .get(rideController.findAll)
    .post(rideController.create);

  router
    .route('/:id')
    .get(rideController.findById);

  return router;
};

