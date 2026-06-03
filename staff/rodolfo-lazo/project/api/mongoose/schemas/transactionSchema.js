import mongoose from "mongoose";
import { EMAIL_REGEX, URL_REGEX } from "com";

const { Schema } = mongoose;

export const transactionSchema = new Schema(
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

    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.00000001,
    },

    price: {
      type: Number,
      required: true,
      min: 0.00000001,
    },

    value: {
      type: Number,
      required: true,
      min: 0.00000001,
    },

    executedAt: {
      type: Date,
      default: Date.now,
    },

    balanceAfter: {
      type: Number,
      required: true,
      //min: 0,
    },
  },
  { timestamps: true },
);

transactionSchema.index({
  userId: 1,
  symbol: 1,
  executedAt: 1,
  _id: 1,
});
