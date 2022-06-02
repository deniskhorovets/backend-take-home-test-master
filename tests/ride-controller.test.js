'use strict';

const assert = require('assert');
const sinon = require('sinon');
const {
  rideMock,
  rideRequestBodyMock
} = require('./mocks');

const { RideController } = require('../src/controllers');

const rideServiceMock = {
  db: {},
  findAll: sinon.stub(),
  create: sinon.stub()
};

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub();
  res.send = sinon.stub();
  return res;
};

const mockRequest = () => {
  const req = {};
  req.body = {};
  req.params = sinon.stub().returns(req);
  return req;
};

describe('Ride Controller tests', () => {
  describe('findAll test', () => {
    beforeEach(() => {
      rideServiceMock.findAll.reset();
    });
    it('should call findAll and send correct data and status', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const expectedResult = [rideMock()];
      res.send.returns(expectedResult);
      res.status.returns(null);

      rideServiceMock.findAll.resolves([rideMock()]);
      const rideController = new RideController(rideServiceMock);

      const response = await rideController.findAll(req, res);
      assert.deepEqual(response, expectedResult);
      sinon.assert.calledWith(res.send, expectedResult);
    });
    it('should call findAll and send 500 status code with error', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = 'error';
      res.send.returns(error);
      res.status.returns(null);

      rideServiceMock.findAll.throws(error);
      const rideController = new RideController(rideServiceMock);

      const response = await rideController.findAll(req, res);
      sinon.assert.calledWith(res.status, 500);
      assert.deepEqual(response, error);
    });
  });
  describe('create test', () => {
    beforeEach(() => {
      rideServiceMock.create.reset();
    });
    it('should call create and send correct data and status', async () => {
      const req = mockRequest();
      req.body = rideRequestBodyMock();
      const res = mockResponse();
      const expectedResult = [rideMock()];
      res.send.returns(expectedResult);
      res.status.returns(null);

      rideServiceMock.create.resolves([rideMock()]);
      const rideController = new RideController(rideServiceMock);

      const response = await rideController.create(req, res);
      assert.deepEqual(response, expectedResult);
      sinon.assert.calledWith(res.send, expectedResult);
    });
    it('should call create and send 500 status code with error', async () => {
      const req = mockRequest();
      req.body = rideRequestBodyMock();
      delete req.body.rider_name;

      const res = mockResponse();
      res.send = (arg) => arg;
      res.status.returns(null);

      const rideController = new RideController(rideServiceMock);

      const response = await rideController.create(req, res);
      assert.equal(response.error_code, 'VALIDATION_ERROR');
      assert.equal(response.message[0], 'rider_name name must be a non empty string');
      sinon.assert.calledWith(res.status, 500);
    });
  });
});
