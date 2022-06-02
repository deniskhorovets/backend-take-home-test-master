'use strict';

const util = require('util');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serializeAsync = util.promisify(db.serialize);
db.getAsync = util.promisify(db.get);
db.allAsync = util.promisify(db.all);
db.runAsync = (sql, args) => new Promise((res, rej) => {
  return db.run(sql, args, function(err) {
    if (err) {
      return rej(err);
    }
    const { sql, lastID, changes } = this;
    return res({ sql, lastID, changes });
  });
});

module.exports = db;
