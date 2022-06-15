'use strict';

const repository = require('../repositories/customer.repository');
const md5 = require('md5');
const authService = require('../services/auth.service');
const { StatusCodes } = require('http-status-codes');

exports.post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const response = await repository.create({
      name,
      email,
      password: md5(password + process.env.SALT_KEY),
      roles: ['user'],
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

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await repository.authenticate({
      email,
      password: md5(password + process.env.SALT_KEY),
    });

    if (!customer) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: 'error', message: 'Invalid email or password' });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(StatusCodes.CREATED).json({
      status: 'ok',
      token,
      data: { email: customer.email, name: customer.name },
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar customer',
      error: err.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 'error', message: 'UNAUTHORIZED' });
      return;
    }

    const Generatetoken = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles,
    });

    res.status(StatusCodes.CREATED).json({
      status: 'ok',
      token: Generatetoken,
      data: { email: customer.email, name: customer.name },
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar customer',
      error: err.message,
    });
  }
};
