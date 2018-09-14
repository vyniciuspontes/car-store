const express = require('express');
const path = require('path');
const app = express();

var __dirname = '/home/vyniciuspontes/Development/Javascript/car-store/site';

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/static/dependencies/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/static/dependencies/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd/')));
app.use('/static/dependencies/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use('/static/dependencies/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.listen(8000, () => console.log('File server is running on port 8000'));
