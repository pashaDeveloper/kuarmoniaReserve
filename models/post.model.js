import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  

connectDB();

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minlength: [5, "عنوان پست باید حداقل ۵ کاراکتر باشد"],
      maxlength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    summary: { 
      type: String,
      required: [true, "عنوان پست الزامی است"],
       minlength: [5, "عنوان پست باید حداقل ۵ کاراکتر باشد"],
       maxlength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
      },
    content: {
      type: String,
      required: [true, "محتوای پست الزامی است"],
      minlength: [20, "محتوای پست باید حداقل ۲۰ کاراکتر باشد"],
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User', 
       required: [true, "عنوان پست الزامی است"],
      },
      isPublished: { 
        type: Boolean,
         default: false ,
         required: [true, "عنوان پست الزامی است"],
         slug: { type: String, unique: true, required: true }
        },
        
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        return this.title.toString()
        .trim()
        .toLowerCase()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\s\ـ]+/g, "-") 
        .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "") 
        .replace(/-+/g, "-") 
        .replace(/^-+|-+$/g, "");
      },  
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);


export default models.Post || model("Post", postSchema);
