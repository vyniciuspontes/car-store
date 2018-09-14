'use strict'

var DAO = require('./dao.js');

class ModelDAO extends DAO{

  constructor(connection) {
    super(connection);
    this.table = 'model';
  }

  findByBrand(brandId) {
    let query = 'select m.* from model m ' +
      'join brand b on b.id = m.brand_id ' +
      'where b.id=?';

    return new Promise ( (resolve, reject) => {
      this.connection.query(query, [brandId], (error, results, fields) => {
        if(error) reject(error);
        resolve(results);
      });
    });
  }
}

module.exports = ModelDAO;
