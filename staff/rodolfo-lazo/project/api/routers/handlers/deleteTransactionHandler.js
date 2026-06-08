import { logic } from '../../logic/index.js'

export function deleteTransactionHandler(req, res, next) {
  try {
    const { userId } = req
    const { transactionId } = req.params

    logic
      .deleteTransaction(userId, transactionId)
      .then(() => res.status(204).send())
      .catch(next)
  } catch (error) {
    next(error)
  }
}
