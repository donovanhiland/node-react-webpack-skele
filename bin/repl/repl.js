const repl = require('repl');
const moment = require('moment');
const chalk = require('chalk');

const r = repl.start('> ');

Object.defineProperty(r.context, 'moment', {
  configurable: false,
  enumerable: true,
  value: moment,
});

Object.defineProperty(r.context, 'chalk', {
  configurable: false,
  enumerable: true,
  value: chalk,
});
