const expressRouter = require('express').Router;
const ridesRouter = require('./ride');

const router = expressRouter();

module.exports = (db) => {
  router.use('/rides', ridesRouter(db));
  return router;
};
