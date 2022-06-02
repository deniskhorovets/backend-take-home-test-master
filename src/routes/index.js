const { Router: expressRouter } = require('express');
const ridesRouter = require('./ride');
const healthRouter = require('./health');

const router = expressRouter();

module.exports = (db) => {
  router.use('/rides', ridesRouter(db));
  router.use('/health', healthRouter());

  return router;
};
