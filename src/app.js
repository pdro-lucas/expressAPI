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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set routes
app.use('/api/v1', appRoutes);
app.use('/api/v1/products', productsRoutes);

module.exports = app;
