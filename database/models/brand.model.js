
import mongoose from "mongoose";
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "name of category is required"],
      trim: true,
      minLength: [2, "too short name"],
    },
    logo:String,
    
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
 // after find insert in database 
brandSchema.post('init',(doc)=>{
doc.logo= process.env.BASE_URL+'/brand/'+doc.logo
})

export const brandModel = mongoose.model(
  "brand",
  brandSchema
);
