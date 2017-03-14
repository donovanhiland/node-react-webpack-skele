const express = require('express');
const axios = require('axios');
const chalk = require('chalk');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('API ROOT');
});

router.get('/test', (req, res) => {
  res.status(200).send('test working');
});

router.get('*', (req, res) => {
  res.status(404).json(`Cannot GET ${req.originalUrl}`);
});

module.exports = router;
