import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxLength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    price:{
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    imageCover: String,
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "Product must be belong to category"],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "brand",
    },
  },
  {
    timestamps: true,toJSON: { virtuals: true } ,toObject: { virtuals: true } 
  }
);
// after find insert in database
productSchema.post("init", (doc) => {
  doc.imageCover = process.env.BASE_URL + "/product/" + doc.imageCover;
  doc.images = doc.images.map(
    (path) => process.env.BASE_URL + "/product/" + path
  );
});
productSchema.virtual('Reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product',
});
productSchema.pre(/^find/,function(){
  this.populate('Reviews')
  })
export const productModel = mongoose.model("product", productSchema);
