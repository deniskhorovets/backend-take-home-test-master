const ridesErrorMock = require('./rides-error');
const errorMessages = require('./constants');
const rideMock = require('./ride');

module.exports = {
  ridesErrorMock,
  errorMessages,
  ...rideMock
};
