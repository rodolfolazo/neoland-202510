//import { fetchPrices } from "../services/binanceService.js";
import { services } from "../services/index.js";

import { data, MarketPriceData } from "../data/index.js";

export function addMarketPrice() {
  return services.fetchPrices().then(({ provider, lastUpdate, prices }) => {
    const marketPriceData = new MarketPriceData(
      null,
      provider,
      lastUpdate,
      prices,
    );
    return data.insertMarketPrice(marketPriceData);
  });
}
