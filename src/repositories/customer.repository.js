'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = (data) => {
  const customer = new Customer(data);
  return customer.save();
};

exports.authenticate = async ({ email, password }) => {
  const res = await Customer.findOne({
    email,
    password,
  });
  return res;
};
