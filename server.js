'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fs          = require('fs');
const app         = express();
const customers   = JSON.parse(fs.readFileSync('mock/customers.json', 'utf-8'));
const cars        = JSON.parse(fs.readFileSync('mock/cars.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(3000);
