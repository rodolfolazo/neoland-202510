import { Router } from "express";

import { authMiddleware } from "../middlewares/index.js";

import { getPricesHandler } from "./handlers/getPricesHandler.js";

export const priceRouter = new Router();

priceRouter.get("", authMiddleware, getPricesHandler);
