'use strict';
const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { SWAGGER_PORT } = require('../../config');
const logger = require('../../src/utils/logger');

const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(SWAGGER_PORT);
logger.info(`Swagger is running on port ${SWAGGER_PORT}`);
