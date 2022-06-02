'use strict';

const { logger } = require('./src/utils');
const { db, initializeDB } = require('./src/db');
const { APP_PORT } = require('./config');

initializeDB(db)
  .then((dbInstance) => {
    const app = require('./src/app')(dbInstance);
    app.listen(APP_PORT, () => logger.info(`App started and listening on port ${APP_PORT}`));
  })
  .catch((error) => logger.error('Failed to initialize app' + error));
