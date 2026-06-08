import { BalanceError } from 'com'
import { data, TransactionData } from '../../data/index.js'

export function calculateBalanceChain(userId, symbol, startExecutedAt) {
  let previousBalance = 0

  return data
    .findPreviousTransaction(userId, symbol, startExecutedAt)
    .then((previousTransactionData) => {
      if (previousTransactionData)
        previousBalance = previousTransactionData.balanceAfter

      return data.findTransactionsFromDate(userId, symbol, startExecutedAt)
    })
    .then((transactionsData) => {
      let chain = Promise.resolve()
      let balance = previousBalance

      transactionsData.forEach((transactionData) => {
        chain = chain.then(() => {
          const delta =
            transactionData.type === 'BUY'
              ? transactionData.quantity
              : -transactionData.quantity

          if (
            transactionData.type === 'SELL' &&
            balance < transactionData.quantity
          )
            throw new BalanceError(
              'not enough balance at this point in history',
            )

          balance += delta

          const updatedTransactionData = new TransactionData(
            transactionData.id,
            transactionData.userId,
            transactionData.symbol,
            transactionData.type,
            transactionData.quantity,
            transactionData.price,
            transactionData.value,
            transactionData.executedAt,
            balance,
          )

          return data.updateTransaction(updatedTransactionData)
        })
      })

      return chain
    })
}
