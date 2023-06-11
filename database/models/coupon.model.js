import mongoose from "mongoose";
const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "name of category is required"],
      unique: true,
      trim: true,
    },
    discount:{
        type:Number,
        min:0,
        required:[true,'coupon discount required']
    },
    expire:{
        type:Date,
        required:[true,'coupon date required']
  
    }
  },
  {
    timestamps: true,
  }
);

export const couponModel = mongoose.model("coupon", couponSchema);
