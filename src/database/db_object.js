const db = require("oracledb");
db.outFormat = db.OBJECT;
db.autoCommit = true;

module.exports = db;