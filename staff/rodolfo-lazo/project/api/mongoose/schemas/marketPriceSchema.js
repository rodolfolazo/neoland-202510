import mongoose from "mongoose";

const { Schema } = mongoose;

export const marketPriceSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
  data: {
    type: Map,
    of: Number,
    required: true,
  },
});
