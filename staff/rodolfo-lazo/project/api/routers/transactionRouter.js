import { Router } from "express";

import { authMiddleware } from "../middlewares/index.js";

import {
  addTransactionHandler,
  getTransactionsHandler,
  getTransactionHandler,
  getTransactionsBySymbolHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
} from "./handlers/index.js";

export const transactionRouter = new Router();

transactionRouter.post("", authMiddleware, addTransactionHandler);
transactionRouter.get("", authMiddleware, getTransactionsHandler);
transactionRouter.get("/:transactionId", authMiddleware, getTransactionHandler);
transactionRouter.get(
  "/symbol/:symbol",
  authMiddleware,
  getTransactionsBySymbolHandler,
);
transactionRouter.put(
  "/:transactionId",
  authMiddleware,
  updateTransactionHandler,
);
transactionRouter.delete(
  "/:transactionId",
  authMiddleware,
  deleteTransactionHandler,
);
