import { SystemError } from "com";
import { logic } from "../logic/index.js";

const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL;

export function startPriceUpdater() {
  logic
    .addMarketPrice()
    .then(() => {
      console.log("Prices loaded");
    })
    .catch((error) => {
      console.error("Error loading prices:", error);
    });

  return setInterval(() => {
    logic
      .addMarketPrice()
      .then(() => {
        console.log("Prices updated");
      })
      .catch((error) => {
        console.error("Error updating prices:", error);
      });
  }, UPDATE_INTERVAL);
}
