'use strict';

const repository = require('../repositories/customer.repository');
const md5 = require('md5');
const { StatusCodes } = require('http-status-codes');

exports.post = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const response = await repository.create({
      name,
      email,
      password: md5(password + process.env.SALT_KEY),
    });
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
