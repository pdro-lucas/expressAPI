'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (req, res, next) => {
  const response = await Order.find({}, 'number, status')
    .populate('customer', 'name')
    .populate('items.product', 'title');
  return response;
};

exports.create = (data) => {
  const order = new Order(data);
  return order.save();
};
