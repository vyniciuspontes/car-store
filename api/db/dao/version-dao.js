'use strict'

var DAO = require('./dao.js');

class VersionDAO extends DAO{

  constructor(connection) {
    super(connection);
    this.table = 'version';
  }
}

module.exports = VersionDAO;
