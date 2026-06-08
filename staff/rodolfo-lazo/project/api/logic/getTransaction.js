import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'
import { Transaction } from './models/Transaction.js'

export function getTransaction(userId, transactionId) {
  validate.id(userId, 'userId')
  validate.id(transactionId, 'transactionId')

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

      const {
        id,
        symbol,
        type,
        quantity,
        price,
        value,
        executedAt,
        balanceAfter,
      } = transactionData

      return new Transaction(
        id,
        userId,
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
