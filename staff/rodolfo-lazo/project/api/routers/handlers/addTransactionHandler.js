import { logic } from "../../logic/index.js";

export function addTransactionHandler(req, res, next) {
  try {
    const {
      userId,
      body: { symbol, type, quantity, price, executedAt },
    } = req;

    logic
      .addTransaction(userId, symbol, type, quantity, price, executedAt)
      .then(() => res.status(201).send())
      .catch(next);
  } catch (error) {
    next(error);
  }
}
