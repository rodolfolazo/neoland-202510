import { logic } from '../../logic/index.js'

export function getTransactionsBySymbolHandler(req, res, next) {
  try {
    const { symbol } = req.params
    const { userId } = req

    logic
      .getTransactionsBySymbol(userId, symbol)
      .then((transactions) => res.json(transactions))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
