import { Router } from "express";

import { authMiddleware } from "../middlewares/index.js";

//import { getPricesHandler } from "./handlers/getPricesHandler.js";
import { getMarketPriceHandler } from "./handlers/index.js";

export const priceRouter = new Router();

//priceRouter.get("", authMiddleware, getPricesHandler);
priceRouter.get("", getMarketPriceHandler);
