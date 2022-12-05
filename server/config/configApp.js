const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');

const checkUserRouter = require('../src/routes/checkUserRouter');
const checkProduct = require('../src/routes/checkProduct')
// const regRouter = require('../src/routes/user/regRouter');
// const loginRouter = require('../src/routes/user/loginRouter');

module.exports = function configApp(app) {
  app.use(morgan('dev'));
  app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));

  const { SESSION_SECRET } = process.env;

  const sessionConfig = {
    name: 'Session',
    store: new FileStore(),
    secret: SESSION_SECRET ?? 'vasdg34erh35h24g31f23g3gh3hth',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
    },
  };

  app.use(session(sessionConfig));

  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.use('/check', checkUserRouter);
  app.use('/check-product', checkProduct);
  // app.use('/registr', regRouter);
  // app.use('/login', loginRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../../client/build/index.html'));
  });
}
