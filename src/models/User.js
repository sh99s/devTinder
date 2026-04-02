import mongoose from "mongoose";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Enter a strong password.");
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    imgUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid image url.");
      },
    },
    about: {
      type: String,
      default: "Hi...",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length < 1 || value[0] === "") {
          throw new Error("Atleast add 1 valid skill");
        }
      },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
