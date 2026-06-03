import { logic } from "../../logic/index.js";

export function getTransactionHandler(req, res, next) {
  try {
    const { userId } = req;
    const { transactionId } = req.params;

    logic
      .getTransaction(userId, transactionId)
      .then((transaction) => res.json(transaction))
      .catch(next);
  } catch (error) {
    next(error);
  }
}
