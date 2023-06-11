import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
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
    image: String,
  },
  {
    timestamps: true,
  }
);
categorySchema.post('init',(doc)=>{
  doc.image= process.env.BASE_URL+'/category/'+doc.image
  })
export const categoryModel = mongoose.model("category", categorySchema);
