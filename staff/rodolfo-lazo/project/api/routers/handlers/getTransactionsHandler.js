import { logic } from '../../logic/index.js'

export function getTransactionsHandler(req, res, next) {
  try {
    const { userId } = req

    logic
      .getTransactions(userId)
      .then((transactions) => res.json(transactions))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
