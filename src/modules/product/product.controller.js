import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import * as factory from "../handlers/factor.handler.js";
import { productModel } from "./../../../database/models/product.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
const createProduct = catchAsyncError(async (req, res,next) => {
  req.body.slug = slugify(req.body.title);
  console.log(req.files);
  req.body.imageCover=req.files.imageCover[0].filename
  req.body.images=req.files.images.map(obj=>obj.filename)
  let result = new productModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});
const getAllProducts = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();
  let result = await apiFeatures.mongooseQuery;
  !result && next(new AppError(`Product not found`, 404));
  result && res.json({ message: "success", result, page: apiFeatures.page});
});
const getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await productModel.findById(id);
  !result && next(new AppError(`Product not found`, 404));
  result && res.json({ message: "success", result });
});
const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  let result = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError(`Product not found`, 404));
  result && res.json({ message: "success", result });
});
const deleteProduct = factory.deleteOne(productModel);
export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
};
