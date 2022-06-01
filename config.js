module.exports = {
  APP_PORT: process.env.APP_PORT || 8010,
  SWAGGER_PORT: process.env.SWAGGER_PORT || 8020,
  LOGGER_DATE_FORMAT: process.env.LOGGER_DATE_FORMAT || 'YYYY-MM-DD HH:MM:SS',
  LOGGER_LOGS_PATH: process.env.LOGGER_LOGS_PATH || 'logs/errors.log'
};
