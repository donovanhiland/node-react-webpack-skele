const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/api', require('./api'));

module.exports = (app) => {
  const isDev = process.env.NODE_ENV === 'development';

  // serve static files
  if (isDev) {
    const fs = app.get('wds-fs');
    router.get('*', (req, res, next) => {
      fs.readFile(path.join(process.cwd(), 'build', 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });
  } else {
    router.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'build', 'index.html'));
    });
  }
  return router;
};
