'use strict';
const express = require('express');
const fs      = require('fs');
const app     = express();

app.get('/api', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
