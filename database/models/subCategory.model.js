import mongoose from "mongoose";
const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "name of category is required"],
      trim: true,
      minLength: [2, "too short name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

export const subCategoryModel = mongoose.model(
  "subCategory",
  subCategorySchema
);
