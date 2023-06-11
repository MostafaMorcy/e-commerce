import slugify from "slugify";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { subCategoryModel } from "../../../database/models/subCategory.model.js";
import * as factory from "../handlers/factor.handler.js";
const createSubCategory = catchAsyncError(async (req, res) => {
  const { name, category } = req.body;
  let result = new subCategoryModel({ name, slug: slugify(name), category });
  await result.save();
  res.json({ message: "success", result });
});
const getAllSubCategories = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if(req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  let result = await subCategoryModel.find(filter);
!result && next(new AppError(`subCategory not found`, 404));
  result && res.json({ message: "success", result });
});
const getSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await subCategoryModel.findById(id);
  !result && next(new AppError(`subCategory not found`, 404));
  result && res.json({ message: "success", result });
});
const updateSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  let result = await subCategoryModel.findByIdAndUpdate(id, {
    name,
    category,
    slug: slugify(name),
  });
  !result && next(new AppError(`subCategory not found`, 404));
  result && res.json({ message: "success", result });
});
const deleteSubCategory = factory.deleteOne(subCategoryModel);
export {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
};
