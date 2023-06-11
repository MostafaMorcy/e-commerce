import express from "express";
import * as subCategoryController from "./subCategory.controller.js";

export const subCategoryRouter = express.Router({mergeParams:true});
subCategoryRouter
  .route("/")
  .post(subCategoryController.createSubCategory)
  .get(subCategoryController.getAllSubCategories);
  subCategoryRouter
  .route("/:id")
  .get(subCategoryController.getSubCategory)
  .put(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);
