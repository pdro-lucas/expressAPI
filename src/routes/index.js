'use strict';

const { StatusCodes } = require('http-status-codes');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .json({ title: 'ExpressJS node API', version: '0.0.2' });
});

module.exports = router;
