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

app.get('/api/customer/:id', (req, res) => {
  const customerId = +req.params.id;
  let selectedCustomer = {};
  for (let customer of customers) {
    if (customer.id === customerId) {
      selectedCustomer = customer;
      break;
    }
  }
  res.json(selectedCustomer);
});

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/car/:id', (req, res) => {
  const carId = +req.params.id;
  let selectedCar = {};
  for (let car of cars) {
    if (car.id === carId) {
      selectedCar = car;
      break;
    }
  }
  res.json(selectedCar);
});

app.listen(3000);
