import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";

const createReview = catchAsyncError(async (req, res,next) => {
  req.body.user = req.user._id;
  let isReview= await reviewModel.findOne({user:req.user._id,product:req.body.product})
  if(isReview) return next(new AppError(`you can't add review twice`, 401));
  let result = new reviewModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});
const getAllReviews = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();
  let result = await apiFeatures.mongooseQuery;
  !result && next(new AppError(`Review not found`, 404));
  result && res.json({ message: "success", result, page: apiFeatures.page });
});
const getReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await reviewModel.findById(id);
  !result && next(new AppError(`Review not found`, 404));
  result && res.json({ message: "success", result });
});
const updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await reviewModel.findOneAndUpdate({_id:id, user:req.user._id,},req.body, { new: true });
  !result && next(new AppError(`Review not found`, 404));
  result && res.json({ message: "success", result });
});
const deleteReview = factory.deleteOne(reviewModel);

export { createReview, getAllReviews, updateReview, deleteReview, getReview };
