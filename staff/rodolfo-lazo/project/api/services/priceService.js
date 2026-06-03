import { data, UserData } from "../data/index.js";
import { validate, ExistenceError } from "com";

let prices = {};
let lastUpdate = null;

function fetchPrices() {
  return fetch("https://api.binance.com/api/v3/ticker/price")
    .then((res) => res.json())
    .then((data) => {
      const map = {};

      data.forEach((item) => {
        map[item.symbol] = parseFloat(item.price);
      });

      prices = map;
      lastUpdate = new Date();

      //console.log("Prices updated:", lastUpdate.toISOString());

      return prices;
    })
    .catch((error) => {
      console.error("Error fetching prices:", error.message);
      return null;
    });
}

export function startPriceUpdater() {
  fetchPrices();

  setInterval(() => {
    fetchPrices().catch(() => {});
  }, 5000);
}

export function getPrices(userId) {
  validate.id(userId, "userId");

  return data
    .findUserById(userId)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      return {
        data: prices,
        lastUpdate,
      };
    });
}
