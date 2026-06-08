import { BalanceError } from 'com'

export function validateBalanceChain(transactionsData) {
  let balance = 0

  transactionsData
    .sort((a, b) => {
      const executedAtDiff = new Date(a.executedAt) - new Date(b.executedAt)
      return executedAtDiff
    })
    .forEach((transactionData) => {
      if (transactionData.type === 'BUY') {
        balance += transactionData.quantity
      } else {
        if (balance < transactionData.quantity)
          throw new BalanceError('not enough balance at this point in history')

        balance -= transactionData.quantity
      }
    })
}
