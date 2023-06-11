import { globalErrorMiddleWare } from "../middleWares/globalErrorMiddleware.js";
import { AppError } from "../utils/AppError.js";
import { authRouter } from "./Auth/auth.router.js";
import { addressRouter } from "./address/address.router.js";
import { brandRouter } from "./brands/brand.router.js";
import { categoryRouter } from "./category/category.router.js";
import { productRouter } from "./product/product.router.js";
import { reviewRouter } from "./review/review.router.js";
import { subCategoryRouter } from "./subCategory/subCategory.router.js";
import { userRouter } from "./user/user.router.js";
import { wishlistRouter } from "./whishlist/whishlist.router.js";

export const init = (app) => {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/whishLists", wishlistRouter);
  app.use("/api/v1/addresses", addressRouter);
  app.all("*", (req, res, next) => {
    next(new AppError(`can't find this route:${req.originalUrl}`, 404));
  });
  app.use(globalErrorMiddleWare);
};
