import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";
import Counter from "./counter.model";

connectDB();

const blogSchema = new Schema(
  {
    blogId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function () {
        return this.title
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    description: {
      type: String,
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"],

    },
    content: {
      type: String,
      required: [true, "محتوا الزامی است"],
    },
    publishDate: {
      type: Date,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"],
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag", 
        required: [true, "تگ پست الزامی است"],

      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    featuredImage: {
      type: String,
      default: "",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه نویسنده الزامی است"],
    },

    // اضافه کردن لایک و دیسلایک
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "LikeDislike", // ارجاع به مدل لایک و دیسلایک
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "LikeDislike", // ارجاع به مدل لایک و دیسلایک
      },
    ],

    // اضافه کردن کامنت‌ها
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // ارجاع به مدل کامنت
      },
    ],
  views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },

    ...baseSchema.obj,
  },
  { timestamps: true }
);

blogSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.blogId = await getNextSequenceValue("blogId");
  }
  next();
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}
