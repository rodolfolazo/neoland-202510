import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const URL_REGEX = /^https?:\/\/.+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      required: true,
    },

    email: {
      type: String,
      minLength: 6,
      match: EMAIL_REGEX,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      minLength: 3,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      minLength: 8,
      required: true,
    },

    image: {
      type: String,
      match: URL_REGEX,
      default: null,
    },

    role: {
      type: String,
      enum: ["regular", "pro"],
      default: "regular",
      required: true,
    },
  },
  { timestamps: true },
);

const portfolioSchema = new Schema(
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

const transactionSchema = new Schema(
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
  },
  { timestamps: true },
);

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ symbol: 1, createdAt: -1 });

export const UserModel = model("User", userSchema);
export const PortfolioModel = model("Portfolio", portfolioSchema);
export const TransactionModel = model("Transaction", transactionSchema);

export const database = mongoose;
