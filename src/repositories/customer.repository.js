'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = (data) => {
  const customer = new Customer(data);
  return customer.save();
};
