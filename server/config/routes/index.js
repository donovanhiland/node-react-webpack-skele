const router = require('express').Router();
const path = require('path');
const winston = require('winston');

router.use('/api', require('./api'));

module.exports = router;
