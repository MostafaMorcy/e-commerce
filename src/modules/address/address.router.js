import express from "express";
import * as addressController from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const addressRouter = express.Router();
addressRouter
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), addressController.addToAddress)
  .delete(protectedRoutes, allowedTo("user"), addressController.removeAddress)
  .get(protectedRoutes, allowedTo("user"), addressController.getAllUserAddresses)


