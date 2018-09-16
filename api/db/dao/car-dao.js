'use strict'

var DAO = require('./dao.js');

class CarDAO extends DAO{

  constructor(connection) {
    super(connection);
    this.table = 'car';
  }

  findAll(fullDetails) {
    if(!fullDetails){
      return super.findAll();
    }else{
      let query = 'select b.name as brand, m.name as model, v.name as version, c.* from car c ' +
      'join version v on v.id = c.version_id '+
      'join model m on m.id = v.model_id ' +
      'join brand b on b.id = m.brand_id';

      return new Promise ( (resolve, reject) => {
        this.connection.query(query, (error, results, fields) => {
          if(error) reject(error);
          resolve(results);
        });
      });
    }
  }

  create(versionId, color, year, mileage, imageUrl) {
    let query = 'insert into car (version_id, color, year, mileage, image_url) values ' +
    '(?, ?, ?, ?, ?)';

    console.log('imageURL', imageUrl);

    return new Promise( (resolve, reject) => {
      this.connection.query(query, [versionId, color, year, mileage, imageUrl], (error, results) => {
        if(error) reject(error);
        resolve(results);
      });
    });
  }

}

module.exports = CarDAO;
