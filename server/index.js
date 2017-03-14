/* eslint-disable no-console */
/* === Import dependencies == */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const path = require('path');
const Sequelize = require('sequelize');
const winston = require('winston');
const config = require('./config/environment');
const router = require('./config/routes'); // express 4 routes
const setup = require('./middleware/frontendMiddleware.js');

// initialize db connection
// const sequelize = new Sequelize(config.PG_CONNECTION_URI, { logging: false });
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
//
// const sessionStore = new SequelizeStore({ db: sequelize });

// const forceSsl = (req, res, next) => {
//   winston.debug('Request in...');
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     winston.debug('redircting');
//     return res.redirect(['https://', req.get('Host'), req.url].join(''));
//   }
//   winston.debug('not redirecting');
//   return next();
// };

// set logger levels
winston.level = config.LOG_LEVEL;

const app = express();

setup(app, {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
});
// if (config.env === 'production') {
//   console.log("We are in prod, use SSL");
//   app.use(forceSsl);
// }
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

if (process.env.NODE_ENV === 'development') {
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

// app.use(session({
//   secret: (0 | Math.random() * 6.04e7).toString(36),
//   store: sessionStore,
//   saveUninitialized: true,
//   resave: true,
// }));

const customHost = argv.host || process.env.HOST;
const prettyHost = customHost || 'localhost';

// sessionStore.sync().then(() => {
app.listen(config.port, () => {
  winston.info(chalk.cyan('* Server started ✓'));
  winston.info(chalk.cyan(`* Environment: ${config.env}`));
  winston.info(chalk.cyan(`* Express listening on http://${prettyHost}:${config.port}`));
});
// });
