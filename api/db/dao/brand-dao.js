'use strict'

var DAO = require('./dao.js');

class BrandDAO extends DAO{

  constructor(connection) {
    super(connection);
    this.table = 'brand';
  }
}

module.exports = BrandDAO;
