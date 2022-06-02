const { Router: expressRouter } = require('express');
const { HealthController } = require('../controllers');
const { HealthService } = require('../services');

module.exports = () => {
  const healthService = new HealthService();
  const healthController = new HealthController(healthService);

  const router = expressRouter();
  router
    .route('/')
    .get(healthController.checkHealth);

  return router;
};
