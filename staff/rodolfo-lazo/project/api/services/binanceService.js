import { SystemError } from "com";

let prices = {};
let lastUpdate = null;
let provider = "binance";

export function fetchPrices() {
  return fetch("https://api.binance.com/api/v3/ticker/price")
    .catch((error) => {
      throw new SystemError(error.messsage);
    })
    .then((res) => res.json())
    .then((data) => {
      const map = {};

      data.forEach((item) => {
        map[item.symbol] = parseFloat(item.price);
      });

      prices = map;
      lastUpdate = new Date();

      return {
        provider,
        lastUpdate,
        data: prices,
      };
    });
}
