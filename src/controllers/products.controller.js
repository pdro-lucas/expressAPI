'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const repository = require('../repositories/products.repository');

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

exports.getBySlug = async (req, res, next) => {
  try {
    const response = await repository.findBySlug(req.params.slug);
    res.status(StatusCodes.OK).json({ status: 'ok', response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar produto',
      error: err,
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const response = await repository.findById(req.params.id);
    res.status(StatusCodes.OK).json({ status: 'ok', response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar produto',
      error: err,
    });
  }
};

exports.getByTags = async (req, res, next) => {
  try {
    const response = await repository.findByTag(req.params.tag);
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
  try {
    const response = await repository.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ status: 'ok', message: 'Produto criado com sucesso', response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar produto',
      error: err.message,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    const response = await repository.update(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      status: 'ok',
      message: 'Produto atualizado com sucesso',
      response,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao cadastrar produto',
      error: err,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    if (!req.body.id) {
      throw new Error('O id do produto não foi fornecido');
    }
    const response = await repository.delete(req.body.id);
    res.status(StatusCodes.OK).json({
      status: 'ok',
      message: 'Produto removido com sucesso',
      response,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Falha ao remover produto',
      error: err.message,
    });
  }
};
