export * from "./models/index.js";

import { addTransaction } from "./addTransaction.js";
import { authenticateUser } from "./authenticateUser.js";
import { deleteTransaction } from "./deleteTransaction.js";
import { getPortfolios } from "./getPortfolios.js";
import { getTransaction } from "./getTransaction.js";
import { getTransactions } from "./getTransactions.js";
import { getTransactionsBySymbol } from "./getTransactionsBySymbol.js";
import { getUser } from "./getUser.js";
import { registerUser } from "./registerUser.js";
import { updateTransaction } from "./updateTransaction.js";
import { addMarketPrice } from "./addMarketPrice.js";
import { getMarketPrice } from "./getMarketPrice.js";

export const logic = {
  addTransaction,
  authenticateUser,
  deleteTransaction,
  getPortfolios,
  getTransaction,
  getTransactions,
  getTransactionsBySymbol,
  getUser,
  registerUser,
  updateTransaction,
  addMarketPrice,
  getMarketPrice,
};
