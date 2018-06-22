'use strict';
const express     = require('express');
const fs          = require('fs');
const MongoClient = require('mongodb').MongoClient;
const app         = express();

MongoClient.connect('mongodb://surfer:secret123@ds117101.mlab.com:17101/angular-car-dealer', (err, client) => {
  if (err) {
    console.log('Could not establish a database connection');
    return console.log(err);
  }

  const db = client.db('angular-car-dealer');

  app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/api/customers', (req, res) => {
    const cursor = db.collection('customers').find();
    cursor.toArray((err, results) => {
      if (err) {
        console.log('Error retrieving customers');
        return console.log(err);
      }

      const customers = results.map((val) => {
        delete val._id;
        return val;
      });

      res.json(customers);
    });
  });

  app.post('/api/customers', (req, res) => {
    const postedCustomer = req.body;
    db.collection('customers')
    .save(postedCustomer, (err, result) => {
      if (err) {
        console.log('Error occured while saving a customer');
        return console.log(err);
      }

      console.log('saved to database');
      console.log(result);
      res.redirect('/');
    })
  });

  app.listen(3000);
});
