import { ExistenceError, validate } from "com";
import { data } from "../data/index.js";
import { Transaction } from "./models/Transaction.js";

export function getTransactions(userId) {
  validate.id(userId, "userId");

  return data
    .findUserById(userId)
    .then((user) => {
      if (!user) throw new ExistenceError("user not found");

      return data.findTransactionsByUserId(userId);
    })
    .then((transactionsData) =>
      transactionsData.map(
        ({
          id,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        }) =>
          new Transaction(
            id,
            userId,
            symbol,
            type,
            quantity,
            price,
            value,
            executedAt,
            balanceAfter,
          ),
      ),
    );
}
