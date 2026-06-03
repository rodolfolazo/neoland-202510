import { ExistenceError, validate } from "com";
import { data } from "../data/index.js";
import { Transaction } from "./models/Transaction.js";

export function getTransactionsBySymbol(userId, symbol) {
  validate.id(userId, "userId");
  validate.ticker(symbol, "symbol");

  return data
    .findUserById(userId)
    .then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      return data.findTransactionsBySymbol(userId, symbol);
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
