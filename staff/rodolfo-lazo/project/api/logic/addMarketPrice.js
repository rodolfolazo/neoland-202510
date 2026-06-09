//import { fetchPrices } from "../services/binanceService.js";
import { services } from '../services/index.js'

import { data, MarketPriceData } from '../data/index.js'

export function addMarketPrice() {
  return services.fetchPrices().then(({ provider, lastUpdate, prices }) => {
    const marketPriceData = new MarketPriceData(
      null,
      provider,
      lastUpdate,
      prices,
<<<<<<< HEAD
    )
    return data.insertMarketPrice(marketPriceData)
  })
=======
    );
    return data.insertMarketPrice(marketPriceData);
  });
>>>>>>> 4cd546b1284d09df5530b4d3f16d40fe9269a350
}
