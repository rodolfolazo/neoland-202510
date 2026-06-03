import mongoose from "mongoose";

const { Schema } = mongoose;

export const portfolioSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.00000001,
    },
  },
  { timestamps: true },
);

portfolioSchema.index({ userId: 1, symbol: 1 }, { unique: true });
portfolioSchema.index({ userId: 1 });
