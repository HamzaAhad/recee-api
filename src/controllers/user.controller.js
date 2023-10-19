const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { Category } = require('../models');
// eslint-disable-next-line

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const uploadFile = catchAsync(async (req, res) => {
  // const user = await userService.updateUserById(req.params.userId, req.body);
  // eslint-disable-next-line no-console
  console.log(req.body);
  const catagory = await Category.create({
    modelName: req.body.modelName,
    modelThumbnail: req.body.modelThumbnail,
    modelCategory: req.body.modelCategory,
    modelScaleX: req.body.modelScaleX,
    modelScaleY: req.body.modelScaleY,
    modelScaleZ: req.body.modelScaleZ,
    rotationX: req.body.rotationX,
    rotationY: req.body.rotationY,
    rotationZ: req.body.rotationZ,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    positionZ: req.body.positionZ,
    minY: req.body.minY,
    maxY: req.body.maxY,
    restrictVertical: req.body.restrictVertical,
    thumbnailUrl: req.body.thumbnailUrl,
    modelUrl: req.body.modelUrl,
    rotationAxis: req.body.rotationAxis,
    size: req.body.size,
  });
  // eslint-disable-next-line no-console
  console.log(catagory);
  res.send(catagory);
});

const getCategory = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.query);
  const category = await Category.find();
  // eslint-disable-next-line no-console
  console.log(category, 'category');
  const data = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of category) {
    if (item.modelCategory === req.query.type) {
      data.push(item);
    }
  }
  res.send(data);
});

module.exports = {
  getCategory,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadFile,
};
