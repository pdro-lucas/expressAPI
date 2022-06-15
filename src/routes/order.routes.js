'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/order.controller');
const authService = require('../services/auth.service');

router.get('/', authService.authroize, controller.get);
router.post('/', authService.authroize, controller.post);

module.exports = router;
