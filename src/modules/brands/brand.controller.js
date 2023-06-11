import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import * as factory from "../handlers/factor.handler.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";


const createBrand = catchAsyncError(async (req, res) => {
  req.body.logo = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let result = new brandModel(req.body);
  await result.save();
  res.json({ message: "success", result });
});
const getAllBrands = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate()
    .field()
    .search()
    .sort()
    .filter();
let result = await apiFeatures.mongooseQuery;
!result && next(new AppError(`brand not found`, 404));
result && res.json({ message: "success", result, page: apiFeatures.page });
});
const getBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await brandModel.findById(id);
!result && next(new AppError(`Brand not found`, 404));
result && res.json({ message: "success", result });
});
const updateBrand = catchAsyncError(async (req, res, next) => {
  req.body.logo = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let result = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  !result && next(new AppError(`Brand not found`, 404));
  result && res.json({ message: "success", result });
});
const deleteBrand = factory.deleteOne(brandModel);

export { createBrand, getAllBrands, updateBrand, deleteBrand, getBrand };
