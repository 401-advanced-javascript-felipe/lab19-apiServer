'use strict';

require('dotenv').config();

const express = require('express');
const Q = require('@nmq/q/client');

const app = express();

app.use(express.json());



app.get('/database', (req, res) => {
  let data = {
    name: 'read',
    message: 'This is a get request to database',
  };

  Q.publish('database', 'read', JSON.stringify(data));
  res.send('GET, Read');
});

app.post('/database', (req, res) => {
  let data = {
    name: 'create',
    message: 'This is a post reaquest to database',
  };

  Q.publish('database', 'create', JSON.stringify(data));
  res.send('post');
});

app.put('/database', (res) => {
  let data = {
    name: 'update',
    message: 'This is a put reaquest to database',
  };

  Q.publish('database', 'update', JSON.stringify(data));
  res.send('put');
});

app.delete('/database', (res) => {
  let data = {
    name: 'delete',
    message: 'This is a delete reaquest to database',
  };

  Q.publish('database', 'delete', JSON.stringify(data));
  res.send('delete');
});


app.use('*', (req,res) => {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({error:'Not Found'});
});


app.use((res) => {
  let data = {
    name: 'error',
    message: 'This is an error from the server',
  };
  Q.publish('database', 'error', JSON.stringify(data));
  res.send('error');
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};