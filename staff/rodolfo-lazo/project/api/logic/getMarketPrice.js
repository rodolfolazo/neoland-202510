import { ExistenceError } from "com";

import { data } from "../data/index.js";

import { MarketPrice } from "../logic/models/index.js";

export function getMarketPrice() {
  return data.findMarketPrice().then((marketPriceData) => {
    if (!marketPriceData)
      throw new ExistenceError("market price data not found");

    return new MarketPrice(
      marketPriceData.id,
      marketPriceData.provider,
      marketPriceData.lastUpdate,
      marketPriceData.data,
    );
  });
}
