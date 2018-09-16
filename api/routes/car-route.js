'use strict'

const express = require('express');
const router = express.Router();
const CarDAO = require('../db/dao/car-dao.js');


router.use(function(req, res, next) {
  console.log('Request to car router =>', Date.now());
  next();
});

router.get('/:id',
  function(req, res, next) {
    let id = req.params.id;

    var myDao = new CarDAO(req.connection);

    myDao.findById(id).then(
      function(results) {
        res.json(results);
      },
      function(error) {
        console.log(error);
        res.send(error);
      }
    );
  });

router.get('/',
  function(req, res, next) {
    let id = req.params.id;
    let fullDetails = req.query.fullDetails;
    var myDao = new CarDAO(req.connection);
    myDao.findAll(fullDetails == 'true')
      .then(results =>
        res.json(results))
      .catch(next);

  });

  router.post('/', function(req, res) {
    console.log(req.body);
    var carDao = new CarDAO(req.connection);
    carDao.create(req.body.versionId, req.body.color, req.body.year,
      req.body.mileage, req.body.imageUrl).then(results => {
        console.log('results', results);
        res.status(201).send();
      });
  });


module.exports = router;
