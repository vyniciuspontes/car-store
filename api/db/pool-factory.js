var mysql = require('mysql');
var dbConfigs = require('../config/db_config.json');

var pool = mysql.createPool(dbConfigs);

console.log('pool => created');

pool.on('release', () => console.log('pool => connection released'));

process.on('SIGINT', () =>
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => closed');
        process.exit(0);
    })
);

module.exports = pool;
