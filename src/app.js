/* eslint-disable no-unused-vars */
require('dotenv-safe').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB_URI);

// Load models
const ProductModel = require('./models/products.model');
const CustomerModel = require('./models/customer.model');
const OrderModel = require('./models/order.model');

// Load routes
const appRoutes = require('./routes');
const productsRoutes = require('./routes/products.routes');
const customerRoutes = require('./routes/customer.routes');
const orderRoutes = require('./routes/order.routes');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allor-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// set routes
app.use('/api/v1', appRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/orders', orderRoutes);

module.exports = app;
