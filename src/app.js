'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (db) => {
  const app = express();
  const routes = require('./routes')(db);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use('/', routes);

  return app;
};
