'use strict'

const express = require('express');
const router = express.Router();
const BrandDAO = require('../db/dao/brand-dao.js'), ModelDAO = require('../db/dao/model-dao.js'),
  VersionDAO = require('../db/dao/version-dao.js');


router.use(function(req, res, next) {
  console.log('Request to brand router =>', Date.now());
  next();
});

router.get('/',
  function(req, res, next) {
    let id = req.params.id;
    var myDao = new BrandDAO(req.connection);
    myDao.findAll()
      .then(results =>
        res.json(results))
      .catch(next);
  });

router.get('/:id',
  function(req, res, next) {
    let id = req.params.id;
    var myDao = new BrandDAO(req.connection);
    myDao.findById(id)
      .then(results =>
        res.json(results))
      .catch(next);
  });

router.get('/:id/models', (req, res, next) => {
  var modelDAO = new ModelDAO(req.connection);
  let brandId = req.params.id;
  modelDAO.findByBrand(brandId)
    .then(results =>
      res.json(results))
    .catch(next);
});




module.exports = router;
