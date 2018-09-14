'use strict'

class DAO {
  constructor(connection) {
    this.connection = connection;
  }

  findById(id) {
    let query = 'select * from ' + this.table + ' where id=?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], function(error, results, fields) {
        if (error) return reject(error);
        resolve(results);
      })
    });
  }

  findAll() {
    let query = 'select * from ' + this.table;
    return new Promise((resolve, reject) => {
      this.connection.query(query, function(error, results, fields) {
        if (error) return reject(error);
        resolve(results);
      })
    });
  }
}

module.exports = DAO;
