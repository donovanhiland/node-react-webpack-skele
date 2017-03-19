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
const setup = require('./middleware/frontendMiddleware.js');

// initialize db connection
const sequelize = new Sequelize(config.PG_CONNECTION_URI, { logging: winston.info });
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({ db: sequelize });

// set logger levels
winston.level = config.LOG_LEVEL;

const app = module.exports = express();

setup(app, {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
});

app.use(cors());
app.use(bodyParser.json());

app.use('/', require('./config/routes')(app));

app.use(session({
  secret: (0 | Math.random() * 6.04e7).toString(36),
  store: sessionStore,
  saveUninitialized: true,
  resave: true,
}));

const customHost = argv.host || process.env.HOST;
const prettyHost = customHost || 'localhost';

sessionStore.sync().then(() => {
  app.listen(config.port, () => {
    winston.info(chalk.cyan('* Server started ✓'));
    winston.info(chalk.cyan(`* Environment: ${config.env}`));
    winston.info(chalk.cyan(`* Express listening on http://${prettyHost}:${config.port}`));
  });
});
