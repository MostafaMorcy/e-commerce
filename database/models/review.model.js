import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      unique: [true, "name of category is required"],
      trim: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
      required: [true, "Product must be belong to category"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Product must be belong to category"],
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);
reviewSchema.pre(/^find/,function(){
this.populate('user','name')
})
export const reviewModel = mongoose.model("review", reviewSchema);
