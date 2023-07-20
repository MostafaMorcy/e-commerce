import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import qrCode from "qrcode";

const createCoupon = catchAsyncError(async (req, res, next) => {
  let result = new couponModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});
const getAllCoupons = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();
  let result = await apiFeatures.mongooseQuery;
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.json({ message: "success", result, page: apiFeatures.page });
});
const getCoupon = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findById(id);
  let url = await qrCode.toDataURL(result.code);
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.json({ message: "success", result, url });
});
const updateCoupon = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await couponModel.findOneAndUpdate(id, req.body, { new: true });
  !result && next(new AppError(`Coupon not found`, 404));
  result && res.json({ message: "success", result });
});
const deleteCoupon = factory.deleteOne(couponModel);

export { createCoupon, getAllCoupons, getCoupon, deleteCoupon, updateCoupon };
