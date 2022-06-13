const APIError = require('../../utils/APIError');
const { removeFields } = require('../../utils/helper');
const DATA_TABLE_WEB = require('../../_helper/dataTable');

const USER = require('../../models/user');

/**
 * GET ALL USER DETAIL
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.all = async (req, res, next) => {
  try {
    const MODEL = USER;
    const searchFields = ['firstName', 'lastName', 'nickName', 'email', 'gender'];
    const conditionQuery = {  _id: { $ne: req.user._id }, isDeleted: false };
    const projectionQuery = '-createdAt -updatedAt -__v -isDeleted -deletedAt';
    const sortingQuery = { createdAt: -1 };

    DATA_TABLE_WEB.fetchDataTableRecords(req.body, MODEL, searchFields, conditionQuery, projectionQuery, sortingQuery, function (err, data) {
      if (err) throw new APIError({ status: 500, message: 'Something went wrong while fetch order list.' });
      const jsonString = JSON.stringify(data);
      res.send(jsonString);
    });
  } catch (err) { next(err); }

};

/**
 * SHOW USER BY ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.show = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const user = await USER.findOne({ _id, isDeleted: false });
    if (!user) new APIError({ status: 404, message: 'User not found by givin id' });

    return res.sendJson(200, removeFields(user.toObject(), 'password'));
  } catch (error) {
    next(error);
  }
};

/**
 * CREATE USER
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.create = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await USER.create(payload);

    return res.sendJson(200, removeFields(user.toObject(), 'password'));
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE USER
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.update = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const payload = req.body;

    const user = await USER.findOneAndUpdate({ _id, isDeleted: false }, { $set: payload }, { new: true });
    if (!user) new APIError({ status: 404, message: 'User not found by givin id' });

    return res.sendJson(200, removeFields(user.toObject(), 'password'));
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.destroy = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const user = await USER.findOneAndUpdate({ _id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
    if (!user) new APIError({ status: 404, message: 'User not found by givin id' });

    return res.sendJson(200, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};
