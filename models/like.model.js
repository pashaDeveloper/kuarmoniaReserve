import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";

connectDB();

const likeSchema = new Schema(
  {
  
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false, // این قسمت تغییر کرده تا userId اختیاری باشد

      },
      entityId: {
        type: Schema.Types.ObjectId,
        required: [true, "شناسه موجودیت الزامی است"],
      },
      entityType: {
        type: String,
        enum: ["Blog","News", "Product", "Comment"], // نوع موجودیت: بلاگ، محصول، کامنت و ...
        required: [true, "نوع موجودیت الزامی است"],
      },
      type: {
        type: String,
        enum: ["like", "dislike"], // لایک یا دیسلایک
        required: true,
      },
      ...baseSchema.obj
    },
    { timestamps: true }
);

const Like = models.Like || model("Like", likeSchema);

export default Like;
