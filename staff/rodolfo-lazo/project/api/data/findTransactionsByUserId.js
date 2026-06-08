import { TransactionModel } from '../mongoose/index.js'
import { SystemError } from 'com'
import { TransactionData } from './models/index.js'

export function findTransactionsByUserId(userId) {
  return TransactionModel.find({ userId })
    .sort({ executedAt: -1, createdAt: -1 })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((transactionModels) =>
      transactionModels.map(
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
          new TransactionData(
            id,
            userId.toString(),
            symbol,
            type,
            quantity,
            price,
            value,
            executedAt,
            balanceAfter,
          ),
      ),
    )
}
