const winston = require('winston');
const { LOGGER_DATE_FORMAT, LOGGER_LOGS_PATH } = require('../../config');

const winstonFormat = winston.format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
);

const loggerWithTransport = winston.createLogger({
  format: winston.format.combine(
      winston.format.timestamp({ format: LOGGER_DATE_FORMAT }),
      winston.format.splat(),
      winstonFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winstonFormat
    }),
    new winston.transports.File({ filename: LOGGER_LOGS_PATH, level: 'error', format: winstonFormat })
  ]
});

const logger = {
  info: (msg) => loggerWithTransport.log('info', msg),
  log: (msg) => loggerWithTransport.log('info', msg),
  debug: (msg) => loggerWithTransport.log('debug', msg),
  error: (msg) => loggerWithTransport.log('error', msg)
};

module.exports = logger;
