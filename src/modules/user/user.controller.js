import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { userModel } from "./../../../database/models/user.model.js";

const createUser = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError(`Account already exist`, 409));
  let result = new userModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});
const getAllUsers = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();
  let result = await apiFeatures.mongooseQuery;
  !result && next(new AppError(`User not found`, 404));
  result && res.json({ message: "success", result, page: apiFeatures.page });
});
const getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await userModel.findById(id);
  !result && next(new AppError(`User not found`, 404));
  result && res.json({ message: "success", result });
});
const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError(`User not found`, 404));
  result && res.json({ message: "success", result });
});
const changePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError(`User not found`, 404));
  result && res.json({ message: "success", result });
});

const deleteUser = factory.deleteOne(userModel);

export {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  changePassword,
};
