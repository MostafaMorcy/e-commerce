import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";

const addProductToCart = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product);
  if (!product) next(new AppError(`product not found`, 404));
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    req.body.price = req.product.price;

    let result = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
      price: product.price,
    });
    await result.save();
    return res.json({ message: "success", result });
  }
  let item = isCartExist.cartItems.find(
    (elm) => elm.product == req.body.product
  );
  if (item) {
    item.quantity += 1;
  }
  await isCartExist.save();
  res.json({ message: "success", cart: isCartExist });
});

export { addProductToCart };
