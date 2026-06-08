import { SystemError } from "com";

export function fetchPrices() {
  return fetch("https://api.binance.com/api/v3/ticker/price")
    .catch((error) => {
      throw new SystemError(error.messsage);
    })
    .then((res) => res.json())
    .then((data) => {
      const prices = {};

      data.forEach((item) => {
        prices[item.symbol] = parseFloat(item.price);
      });

      return {
        provider: "binance",
        lastUpdate: new Date(),
        prices,
      };
    });
}
