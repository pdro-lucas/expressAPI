'use strict';

const repository = require('../repositories/customer.repository');
const { StatusCodes } = require('http-status-codes');

exports.post = async (req, res, next) => {
  try {
    const response = await repository.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: 'ok', message: 'Customer criado com sucesso', response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar customer',
      error: err.message,
    });
  }
};
