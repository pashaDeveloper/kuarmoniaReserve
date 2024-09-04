import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  
import Counter from "./counter.model"; // اضافه کردن import

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
    description: {
      type: String,
      maxLength: [200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
    } ,
    categoryId: {
      type: Number,
      unique: true
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

categorySchema.pre('save', async function(next) {
  if (this.isNew) {
    this.categoryId = await getNextSequenceValue('categoryId');
  }
  next();
});
const Category = models.Category || model("Category", categorySchema);

export default Category;


////
async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}