import bcrypt from "bcrypt";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
const signUp = catchAsyncError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) return next(new AppError("email already exist", 409));
  let user = new userModel(req.body);
  await user.save();
  console.log(user)
  res.json({ message: "success", user });
});
const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const isFound = await userModel.findOne({ email });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token = jwt.sign(
      { name: isFound.name, userId: isFound._id, role: isFound.role },
      "mynameismo"
    );
    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 409));
});
const protectedRoutes = catchAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("TOKEN NOT PROVIDED", 401));
  let decoded = jwt.verify(token, "mynameismo");
  console.log(decoded);
  
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("invalid token", 401));
  if (user.passwordChangedAt) {
  let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
  if (changePasswordDate > decoded.iat)
      return next(new AppError("invalid token", 401));
  }
  req.user = user;
  next();
});
const allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "you  are not authorized to access  this endpoint " + req.user.role,
          401
        )
      );
    }
    next();
  });
};
export { signUp, signIn, protectedRoutes, allowedTo };
