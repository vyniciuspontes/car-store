'use strict'

const express = require('express');
const router = express.Router();
const ModelDAO = require('../db/dao/model-dao.js');


router.use(function(req, res, next) {
  console.log('Request to model router =>', Date.now());
  next();
});

router.get('/:id',
  function(req, res, next) {
    let id = req.params.id;
    var myDao = new ModelDAO(req.connection);
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
    var myDao = new ModelDAO(req.connection);
    myDao.findAll()
      .then(results =>
        res.json(results))
      .catch(next);
  });


module.exports = router;
