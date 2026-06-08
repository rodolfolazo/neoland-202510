import { TransactionModel } from '../mongoose/index.js'
import { SystemError } from 'com'
import { TransactionData } from './models/index.js'

export function findTransactionById(transactionId) {
  return TransactionModel.findById(transactionId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((transactionModel) => {
      if (!transactionModel) return null

      const {
        id,
        userId,
        symbol,
        type,
        quantity,
        price,
        value,
        executedAt,
        balanceAfter,
      } = transactionModel

      return new TransactionData(
        id,
        userId.toString(),
        symbol,
        type,
        quantity,
        price,
        value,
        executedAt,
        balanceAfter,
      )
    })
}
