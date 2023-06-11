import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { userModel } from "../../../database/models/user.model.js";

const addToWishlist = catchAsyncError(async (req, res, next) => {
  const { product } = req.body;
  let result = await userModel.findOneAndUpdate(req.user._id,{$addToSet:{whishList:product}},{ new: true });
  !result && next(new AppError(`whishList not found`, 404));
  result && res.json({ message: "success", result :result.whishList});
});
const removeWishlist = catchAsyncError(async (req, res, next) => {
  const { product } = req.body;
  let result = await userModel.findOneAndUpdate(req.user._id,{$pull:{whishList:product}},{ new: true });
  !result && next(new AppError(`whishList not found`, 404));
  result && res.json({ message: "success", result :result.whishList});
});
const getAllUserWishlists = catchAsyncError(async (req, res, next) => {
  let result = await userModel.findOne({_id:req.user._id}).populate('whishList')
  !result && next(new AppError(`whishList not found`, 404));
  result && res.json({ message: "success", result :result.whishList});
});

export {  addToWishlist,removeWishlist,getAllUserWishlists };
 