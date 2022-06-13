'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/products.controller');
const authService = require('../services/auth.service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTags);
router.post('/', authService.authroize, controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
