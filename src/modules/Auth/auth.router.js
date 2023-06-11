import express from "express";
import * as authController from "./auth.controller.js";

export const authRouter = express.Router();
authRouter.post("/signUp", authController.signUp);
authRouter.post("/signIn", authController.signIn);
