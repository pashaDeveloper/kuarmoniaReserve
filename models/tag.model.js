import { Schema, models, model } from "mongoose";
import connectDB from "@/libs/db";
import baseSchema from "./baseSchema.model";  
import Counter from "./counter.model"; // اضافه کردن import

connectDB();

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان تگ الزامی است"],
      trim: true,
      maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"],
    },
    description: {
      type: String,
      required: [true, "توضیحات تگ الزامی است"],
      trim: true,
      maxLength: [160, "توضیحات تگ نباید بیشتر از 160 کاراکتر باشد"],
    },
    keywords: {
      type: [String],
      required: false,
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      set: (value) => value.trim().toLowerCase().replace(/\s+/g, '-'),
    },
    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v); // ساده‌ترین اعتبارسنجی URL
        },
        message: "URL معتبر نیست",
      },
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    robots: {
      type: String,
      enum: ['index', 'noindex', 'follow', 'nofollow'],
      default: 'index',
    },
    schema: {
      type: Schema.Types.Mixed,
      required: false,
    },
    tagId: {
      type: Number,
      unique: true
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

tagSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.tagId = await getNextSequenceValue('tagId');
  }
  next();
});
const tag = models.tag || model("tag", tagSchema);

export default tag;


////
async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { model: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}