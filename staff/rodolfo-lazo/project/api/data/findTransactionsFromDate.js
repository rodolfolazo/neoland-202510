import { TransactionModel } from '../mongoose/index.js'
import { SystemError } from 'com'
import { TransactionData } from './models/index.js'

export function findTransactionsFromDate(userId, symbol, executedAt) {
  return TransactionModel.find({
    userId,
    symbol,
    executedAt: { $gte: executedAt },
  })
    .sort({ executedAt: 1, createdAt: 1 })
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
