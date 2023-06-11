import express from "express";
import * as userController from "./user.controller.js";

export const userRouter = express.Router();
userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);
userRouter.route("/changePassword/:id").patch(userController.changePassword);
