
import { Schema, models, model } from "mongoose";
import { genSaltSync, hashSync, compare } from "bcryptjs";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  

connectDB();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [100, "Name cannot be more than 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },

    avatar: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
        default: "N/A",
      },
      originalName: {
        type: String,
        default: "N/A",
      },
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
    },

    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      unique: true,
    },

    role: {
      type: String,
      enum: ["superAdmin","admin","author","user", "admin","operator"],
      default: "user",
    },

 

    address: {
      type: String,
      trim: true,
      maxLength: [200, "Address cannot be more than 200 characters"],
    },

    rents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rent",
      },
    ],

    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },

    favorite: {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],

    ...baseSchema.obj

  },
  { timestamps: true }
);

// encrypt the password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = genSaltSync(10);
    const hash = hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.encryptPassword = function (password) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
};

userSchema.methods.comparePassword = async function (
  currentPassword,
  storedPassword
) {
  const isMatch = await compare(currentPassword, storedPassword);
  return isMatch;
};

const User = models.User || model("User", userSchema);

export default User;
