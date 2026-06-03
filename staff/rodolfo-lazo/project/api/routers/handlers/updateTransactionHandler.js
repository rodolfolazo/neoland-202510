import { logic } from "../../logic/index.js";

export function updateTransactionHandler(req, res, next) {
  try {
    const { userId } = req;

    const { transactionId } = req.params;

    const { symbol, type, quantity, price, executedAt } = req.body;

    logic
      .updateTransaction(
        userId,
        transactionId,
        symbol,
        type,
        quantity,
        price,
        executedAt,
      )
      .then(() => res.status(204).send())
      .catch(next);
  } catch (error) {
    next(error);
  }
}
