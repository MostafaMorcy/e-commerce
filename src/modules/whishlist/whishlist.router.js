import express from "express";
import * as wishlistController from "./whishlist.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";
export const wishlistRouter = express.Router();
wishlistRouter
  .route("/")
  .patch(protectedRoutes, allowedTo("user"), wishlistController.addToWishlist)
  .delete(protectedRoutes, allowedTo("user"), wishlistController.removeWishlist)
  .get(protectedRoutes, allowedTo("user"), wishlistController.getAllUserWishlists)


