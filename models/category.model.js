import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  

connectDB();

const categorySchema = new Schema(
  {

    title: {
      type: String,
      required: [true, "نام دسته‌بندی الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام دسته‌بندی باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        return this.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      },  // مقدار پیش‌فرض برای جلوگیری از خطا
    },
    description: {
      type: String,
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
    } ,
    ...baseSchema.obj
  },
  { timestamps: true }
);


categorySchema.pre("validate", async function (next) {
  const category = this;

  if (!category.row) {
    const lastCategory = await models.Category.findOne().sort({ row: -1 });
    category.row = lastCategory ? lastCategory.row + 1 : 1;
  }

  if (!category.slug && category.title) {
    category.slug = category.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  next();
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
