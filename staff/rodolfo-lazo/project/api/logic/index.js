export * from "./models/index.js";

import { addTransaction } from "./addTransaction.js";
import { authenticateUser } from "./authenticateUser.js";
import { calculateBalanceChain } from "./calculateBalanceChain.js";
import { deleteTransaction } from "./deleteTransaction.js";
import { getPortfolios } from "./getPortfolios.js";
import { getTransaction } from "./getTransaction.js";
import { getTransactions } from "./getTransactions.js";
import { getTransactionsBySymbol } from "./getTransactionsBySymbol.js";
import { getUser } from "./getUser.js";
import { rebuildPortfolio } from "./rebuildPortfolio.js";
import { registerUser } from "./registerUser.js";
import { updateTransaction } from "./updateTransaction.js";
import { validateBalanceChain } from "./validateBalanceChain.js";

export const logic = {
  addTransaction,
  authenticateUser,
  calculateBalanceChain,
  deleteTransaction,
  getPortfolios,
  getTransaction,
  getTransactions,
  getTransactionsBySymbol,
  getUser,
  rebuildPortfolio,
  registerUser,
  updateTransaction,
  validateBalanceChain,
};
