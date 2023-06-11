import express from "express";
import * as productController from "./product.controller.js";
import { uploadMixFiles } from "../../middleWares/fileUpload.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const productRouter = express.Router();
let fieldsArray = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 10 },
];
productRouter
  .route("/")
  .post(protectedRoutes,allowedTo('admin'),uploadMixFiles(fieldsArray, "product"),productController.createProduct)
  .get(productController.getAllProducts);
productRouter
  .route("/:id")
  .get(productController.getProduct)
  .put(protectedRoutes,allowedTo('admin'),productController.updateProduct)
  .delete(protectedRoutes,allowedTo('admin'),productController.deleteProduct);
