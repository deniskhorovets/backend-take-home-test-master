const buildSchemas = require('./schemas');

const initializeDB = async (db) => {
  await db.serializeAsync();
  await buildSchemas(db);
};

module.exports = initializeDB;
