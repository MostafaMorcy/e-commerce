import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { userModel } from "../../../database/models/user.model.js";

const addToAddress = catchAsyncError(async (req, res, next) => {
  let result = await userModel.findOneAndUpdate(req.user._id,
    {$addToSet:{addresses:req.body}},{ new: true });
  !result && next(new AppError(`address not found`, 404));
  result && res.json({ message: "success", result :result.addresses});
});
const removeAddress = catchAsyncError(async (req, res, next) => {
  let result = await userModel.findOneAndUpdate(req.user._id,
    {$pull:{addresses:{_id:req.body.address}}},{ new: true });
  !result && next(new AppError(`address not found`, 404));
  result && res.json({ message: "success", result :result.addresses});
});
const getAllUserAddresses = catchAsyncError(async (req, res, next) => {
  let result = await userModel.findOne({_id:req.user._id})
  !result && next(new AppError(`whishList not found`, 404));
  result && res.json({ message: "success", result :result.addresses});
});

export {  addToAddress,removeAddress,getAllUserAddresses };
 