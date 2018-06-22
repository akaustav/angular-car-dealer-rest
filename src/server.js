'use strict';
const express     = require('express');
const fs          = require('fs');
const app         = express();
const customers   = JSON.parse(fs.readFileSync(__dirname + '/mock/customers.json', 'utf-8'));
const cars        = JSON.parse(fs.readFileSync(__dirname + '/mock/cars.json', 'utf-8'));

app.get('/api', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

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

app.get('/api/car/:vin', (req, res) => {
  const carVin = +req.params.vin;
  let selectedCar = {};
  for (let car of cars) {
    if (car.vin === carVin) {
      selectedCar = car;
      break;
    }
  }
  res.json(selectedCar);
});

app.listen(3000);
