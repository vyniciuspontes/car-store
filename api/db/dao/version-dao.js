'use strict'

var DAO = require('./dao.js');

class VersionDAO extends DAO{

  constructor(connection) {
    super(connection);
    this.table = 'version';
  }

  findByModel(modelId) {
    let query = 'select v.* from version v ' +
      'join model m on m.id = v.model_id ' +
      'where m.id=?';

    return new Promise ( (resolve, reject) => {
      this.connection.query(query, [modelId], (error, results, fields) => {
        if(error) reject(error);
        resolve(results);
      });
    });
  }

}

module.exports = VersionDAO;
