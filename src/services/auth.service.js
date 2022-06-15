'use strict';

const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, process.env.SALT_KEY);
  return data;
};

exports.authroize = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: 'error', message: 'Acesso Restrito' });
  }

  jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
    if (error)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 'error', message: 'Token inválido' });
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: 'error', message: 'Invalid token' });
  }

  jwt.verify(token, process.env.SALT_KEY, function (err, decoded) {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 'error', message: 'Invalid token' });
    }
    if (!decoded.roles.includes('admin')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'only admin have a permision to execute this function',
      });
    }
    next();
  });
};
