import express from "express";
import * as reviewController from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const reviewRouter = express.Router();
reviewRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), reviewController.createReview)
  .get(reviewController.getAllReviews);
reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .put(protectedRoutes, allowedTo("user"), reviewController.updateReview)
  .delete(protectedRoutes, allowedTo('admin',"user"), reviewController.deleteReview);