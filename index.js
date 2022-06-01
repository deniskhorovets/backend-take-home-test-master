'use strict';

const express = require('express');
const app = express();
const logger = require('./src/utils/logger');
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
  buildSchemas(db);

  const app = require('./src/app')(db);

  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
