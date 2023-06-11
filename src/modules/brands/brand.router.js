import express from "express";
import * as brandController from "./brand.controller.js";
import { validation } from "../../middleWares/validation.js";
import {
  createBrandSchema,
  getBrandSchema,
  updateBrandSchema,
} from "./brand.validator.js";
import { uploadSingleFile } from "../../middleWares/fileUpload.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const brandRouter = express.Router();
brandRouter
  .route("/")
  .post(protectedRoutes,allowedTo('admin'),
    uploadSingleFile("logo", "brand"),
    validation(createBrandSchema),
    brandController.createBrand
  )
  .get(brandController.getAllBrands);
brandRouter
  .route("/:id")
  .get(validation(getBrandSchema), brandController.getBrand)
  .put(protectedRoutes,allowedTo('admin','user'),validation(updateBrandSchema), brandController.updateBrand)
  .delete(protectedRoutes,allowedTo('admin','user'),brandController.deleteBrand);
