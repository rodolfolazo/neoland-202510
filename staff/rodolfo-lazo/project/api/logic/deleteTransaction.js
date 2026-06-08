import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'
import {
  validateBalanceChain,
  calculateBalanceChain,
  rebuildPortfolio,
} from './helpers/index.js'

export function deleteTransaction(userId, transactionId) {
  validate.id(userId, 'userId')
  validate.id(transactionId, 'transactionId')

  let deletedTransactionData

  return data
    .findUserById(userId)
    .then((userData) => {
      if (!userData) throw new ExistenceError('user not found')

      return data.findTransactionById(transactionId)
    })
    .then((transactionData) => {
      if (!transactionData) throw new ExistenceError('transaction not found')

      if (transactionData.userId !== userId)
        throw new OwnershipError('user not owner of transaction')

      deletedTransactionData = transactionData

      return data.findTransactionsBySymbol(
        deletedTransactionData.userId,
        deletedTransactionData.symbol,
      )
    })
    .then((transactionsData) => {
      const simulatedTransactionsData = transactionsData.filter(
        (tx) => tx.id !== transactionId,
      )

      validateBalanceChain(simulatedTransactionsData)
    })
    .then(() => data.deleteTransaction(transactionId))
    .then(() =>
      calculateBalanceChain(
        deletedTransactionData.userId,
        deletedTransactionData.symbol,
        deletedTransactionData.executedAt,
      ),
    )
    .then(() => rebuildPortfolio(userId))
}
