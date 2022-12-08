const morgan = require('morgan');
const express = require('express');
const path = require('path');

const checkProduct = require('../src/routes/checkProduct')

module.exports = function configApp(app) {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.use('/check-product', checkProduct);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../../client/build/index.html'));
  });
}
