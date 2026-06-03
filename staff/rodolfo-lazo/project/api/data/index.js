export * from "./models/index.js";

import { insertUser } from "./insertUser.js";
import { findUserByEmail } from "./findUserByEmail.js";
import { findUserByUsername } from "./findUserByUsername.js";
import { findUserById } from "./findUserById.js";
import { updateUser } from "./updateUser.js";
import { deleteAllUsers } from "./deleteAllUsers.js";
import { findTransactionById } from "./findTransactionById.js";
import { findTransactionsByUserId } from "./findTransactionsByUserId.js";
import { findTransactionsBySymbol } from "./findTransactionsBySymbol.js";
import { findPreviousTransaction } from "./findPreviousTransaction.js";
import { findTransactionsFromDate } from "./findTransactionsFromDate.js";
import { insertTransaction } from "./insertTransaction.js";
import { updateTransaction } from "./updateTransaction.js";
import { deleteTransaction } from "./deleteTransaction.js";
import { deleteAllTransactions } from "./deleteAllTransactions.js";
import { findPortfoliosByUserId } from "./findPortfoliosByUserId.js";
import { replacePortfolio } from "./replacePortfolio.js";
import { deleteAllPortfolios } from "./deleteAllPortfolios.js";

export const data = {
  insertUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updateUser,
  deleteAllUsers,
  findTransactionById,
  findTransactionsByUserId,
  findTransactionsBySymbol,
  findPreviousTransaction,
  findTransactionsFromDate,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  deleteAllTransactions,
  findPortfoliosByUserId,
  replacePortfolio,
  deleteAllPortfolios,
};
