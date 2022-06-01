'use strict';

const util = require('util');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serializeAsync = util.promisify(db.serialize);
db.runAsync = util.promisify(db.run);
db.getAsync = util.promisify(db.get);
db.allAsync = util.promisify(db.all);

module.exports = db;
