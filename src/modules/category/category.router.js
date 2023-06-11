import express from "express";
import * as categoryController from "./category.controller.js";
import { subCategoryRouter } from "../subCategory/subCategory.router.js";
import { validation } from "../../middleWares/validation.js";
import { createCategorySchema,getCategorySchema,updateCategorySchema } from "./category.validator.js";
import { uploadSingleFile } from "../../middleWares/fileUpload.js";
export const categoryRouter = express.Router();



categoryRouter.use('/:categoryId/subCategories',subCategoryRouter )
categoryRouter
  .route("/")
  .post(uploadSingleFile('image','category'),validation(createCategorySchema),categoryController.createCategory)
  .get(categoryController.getAllCategories);

categoryRouter
  .route("/:id")
  .get(validation(getCategorySchema),categoryController.getCategory)
  .put(uploadSingleFile('image','category'),validation(updateCategorySchema),categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
