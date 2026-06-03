import { ExistenceError, OwnershipError, validate } from "com";
import { data } from "../data/index.js";

export function deleteTransaction(userId, transactionId) {
  validate.id(userId, "userId");
  validate.id(transactionId, "transactionId");

  let deletedTransactionData;

  return data
    .findUserById(userId)
    .then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      return data.findTransactionById(transactionId);
    })
    .then((transactionData) => {
      if (!transactionData) throw new ExistenceError("transaction not found");

      if (transactionData.userId !== userId)
        throw new OwnershipError("user not owner of transaction");

      deletedTransactionData = transactionData;

      return data.findTransactionsBySymbol(
        deletedTransactionData.userId,
        deletedTransactionData.symbol,
      );
    })
    .then((transactionsData) => {
      const simulatedTransactionsData = transactionsData.filter(
        (tx) => tx.id !== transactionId,
      );

      this.validateBalanceChain(simulatedTransactionsData);
    })
    .then(() => data.deleteTransaction(transactionId))
    .then(() =>
      this.calculateBalanceChain(
        deletedTransactionData.userId,
        deletedTransactionData.symbol,
        deletedTransactionData.executedAt,
      ),
    )
    .then(() => this.rebuildPortfolio(userId));
}
