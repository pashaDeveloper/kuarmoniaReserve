import { Schema, models, model } from "mongoose";

const baseSchema = new Schema(
  {
    row: {
      type: Number,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
baseSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastDoc = await this.constructor.findOne().sort({ row: -1 });
    this.row = lastDoc ? lastDoc.row + 1 : 1;
  }
  next();
});
export default baseSchema;
