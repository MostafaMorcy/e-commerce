import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "name too short"],
      maxLength: [15, "name too long "],
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    phone: { type: String, required: [true, " phone number required"] },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    profilePic: String,
    age: {
      type: Number,
      min: 15,
      max: 70,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    whishList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }],
    addresses: [{ city: String, street: String, phone: String }],
    passwordChangedAt: Date,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function () {
  console.log(this);
  this.password = bcrypt.hashSync(this.password, 8);
});
userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});
export const userModel = mongoose.model("user", userSchema);


