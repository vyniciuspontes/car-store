'use strict'

module.exports = function(pool) {

    return function(req, res, next) {

    pool.getConnection((err, connection) => {
        console.log('1');
        if(err) return next(err);
        console.log('pool => get connection');
        req.connection = connection;
        // passa a requisição o próximo middleware
        next();
        // devolve a conexão para o pool no final da resposta
        res.on('finish', () => req.connection.release());
    });
  }
};
