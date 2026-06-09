<<<<<<< HEAD
import { SystemError } from 'com'
=======
import { SystemError } from "com";
>>>>>>> 4cd546b1284d09df5530b4d3f16d40fe9269a350

export function fetchPrices() {
  return fetch('https://api.binance.com/api/v3/ticker/price')
    .catch((error) => {
      throw new SystemError(error.messsage)
    })
    .then((res) => res.json())
    .then((data) => {
<<<<<<< HEAD
      const prices = {}

      data.forEach((item) => {
        prices[item.symbol] = parseFloat(item.price)
      })

      return {
        provider: 'binance',
        lastUpdate: new Date(),
        prices,
      }
    })
=======
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
>>>>>>> 4cd546b1284d09df5530b4d3f16d40fe9269a350
}
