'use strict';

const request = require('supertest');
const assert = require('assert');
const { db, initializeDB } = require('../src/db');
const app = require('../src/app')(db);
const {
  ridesErrorMock,
  errorMessages,
  rideMock,
  rideRequestBodyMock
} = require('./mocks');

describe('API tests', () => {
  before((done) => {
    initializeDB(db)
      .then(() => done())
      .catch((e) => done(e));
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('GET /rides', () => {
    it('should return no rides error', (done) => {
      const errorObject = ridesErrorMock(
        errorMessages.RIDES_NOT_FOUND_ERROR,
        errorMessages.NO_RIDES_FOUND_MESSAGE
      );
      request(app).get('/rides')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.deepEqual(res.body, errorObject);
        })
        .expect(500, done);
    });
    it('should return an error for ride by id', (done) => {
      const errorObject = ridesErrorMock(
        errorMessages.RIDES_NOT_FOUND_ERROR,
        'Could not find a ride with id 1'
      );
      request(app).
        get('/rides/1').
        expect('Content-Type', 'application/json; charset=utf-8').
        expect((res) => {
          assert.deepEqual(res.body, errorObject);
        }).
        expect(500, done);
    });
  });

  describe('POST /rides', () => {
    it('should create a new ride', (done) => {
      const req = rideRequestBodyMock();

      request(app)
        .post('/rides')
        .send(req)
        .expect((res) => {
          const created = res.body[0].created;
          assert.deepEqual(res.body, [rideMock(true, created)]);
        })
        .expect(200, done);
    });

    it('should return a validation rider name error', (done) => {
      const req = rideRequestBodyMock();
      delete req.rider_name;

      const errorObject = ridesErrorMock(
        errorMessages.VALIDATION_ERROR,
        [errorMessages.NO_RIDER_NAME_MESSAGE]
      );

      request(app)
        .post('/rides')
        .send(req)
        .expect((res) => {
          assert.deepEqual(res.body, errorObject);
        })
        .expect(500, done);
    });

    it('should return a validation start latitude error', (done) => {
      const req = rideRequestBodyMock();
      req.start_lat = -91;

      const errorObject = ridesErrorMock(
        errorMessages.VALIDATION_ERROR,
        [errorMessages.START_LATITUDE_ERROR]
      );

      request(app)
        .post('/rides')
        .send(req)
        .expect((res) => {
          assert.deepEqual(res.body, errorObject);
        })
        .expect(500, done);
    });
    it('should return a validation end latitude error', (done) => {
      const req = rideRequestBodyMock();
      req.end_lat = -91;

      const errorObject = ridesErrorMock(
        errorMessages.VALIDATION_ERROR,
        [errorMessages.END_LATITUDE_ERROR]
      );

      request(app)
        .post('/rides')
        .send(req)
        .expect((res) => {
          assert.deepEqual(res.body, errorObject);
        })
        .expect(500, done);
    });
  });

  describe('GET /rides', () => {
    it('should return rides list', (done) => {
      request(app).
        get('/rides').
        expect('Content-Type', 'application/json; charset=utf-8').
        expect((res) => {
          const created = res.body[0].created;
          assert.deepEqual(res.body, [rideMock(true, created)]);
        }).
        expect(200, done);
    });
    it('should return a ride by id', (done) => {
      request(app).
        get('/rides/1').
        expect('Content-Type', 'application/json; charset=utf-8').
        expect((res) => {
          const created = res.body[0].created;
          assert.deepEqual(res.body, [rideMock(true, created)]);
        }).
        expect(200, done);
    });
  });
});
