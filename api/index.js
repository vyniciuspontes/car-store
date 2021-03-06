'use strict'

const express = require('express'), app = express(),
  pool = require('./db/pool-factory.js'),
  connectionMiddleware = require('./db/connection-middleware.js');

const cors = require('cors'), bodyParser = require('body-parser');

const carRoute = require('./routes/car-route.js'), brandRoute = require('./routes/brand-route'),
modelRoute = require('./routes/model-route'), versionRoute = require('./routes/version-route');

app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

app.use(connectionMiddleware(pool))

app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>');
});

app.use('/cars', carRoute);
app.use('/brands', brandRoute);
app.use('/models', modelRoute);
app.use('/versions', versionRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});

app.listen(3000, () => console.log('Api server is running on port 3000'));
