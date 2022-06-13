'use strict';

const guid = require('guid');
const repository = require('../repositories/order.repository');
const { StatusCodes } = require('http-status-codes');

exports.get = async (req, res, next) => {
  try {
    const response = await repository.get();
    res.status(StatusCodes.OK).json({ status: 'ok', response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar produto',
      error: err,
    });
  }
};

exports.post = async (req, res, next) => {
  const { customer, items } = req.body;
  try {
    const response = await repository.create({
      customer,
      number: guid.raw().substring(0, 6),
      items,
    });
    res.status(StatusCodes.CREATED).json({
      status: 'ok',
      message: 'Pedido cadastrado com sucesso',
      response,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar pedido',
      error: err.message,
    });
  }
};
