import express from "express";
import * as cartController from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const cartRouter = express.Router();
cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), cartController.addProductToCart)

  //.get(couponController.getAllCoupons);
  // cartRouter
  // .route("/:id")
  // .get(couponController.getCoupon)
  // .put(protectedRoutes, allowedTo("user"), couponController.updateCoupon)
  // .delete(protectedRoutes, allowedTo('admin',"user"), couponController.deleteCoupon);