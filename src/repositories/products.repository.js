'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () =>
  Product.find(
    {
      active: true,
    },
    'title price slug'
  );

exports.findBySlug = (slug) =>
  Product.findOne(
    {
      slug,
      active: true,
    },
    'title description price slug tags'
  );

exports.findByTag = (tags) =>
  Product.find(
    {
      tags,
      active: true,
    },
    'title description price slug tags'
  );

exports.findById = (id) => Product.findById(id);

exports.create = (data) => {
  const product = new Product(data);
  return product.save();
};

exports.update = (id, { title, description, price, slug }) =>
  Product.findByIdAndUpdate(id, {
    $set: {
      title,
      description,
      price,
      slug,
    },
  });

exports.delete = (id) => Product.findByIdAndRemove(id);
