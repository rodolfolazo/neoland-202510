import { ExistenceError, BalanceError, validate } from 'com'
import { TransactionData, data } from '../data/index.js'
import {
  validateBalanceChain,
  calculateBalanceChain,
  rebuildPortfolio,
} from './helpers/index.js'

export function addTransaction(
  userId,
  symbol,
  type,
  quantity,
  price,
  executedAt,
) {
  validate.id(userId, 'userId')
  validate.ticker(symbol, 'symbol')
  validate.type(type, 'type')
  validate.number(quantity, 'quantity')
  validate.number(price, 'price')

  const txData = new TransactionData(
    null,
    userId,
    symbol,
    type,
    quantity,
    price,
    quantity * price,
    executedAt,
    0,
  )

  return data
    .findUserById(userId)
    .then((userData) => {
      if (!userData) throw new ExistenceError('user not found')

      return data.findTransactionsBySymbol(userId, symbol)
    })
    .then((transactionsData) => {
      transactionsData.push(txData)
      validateBalanceChain(transactionsData)

      return data.insertTransaction(txData)
    })
    .then(() => calculateBalanceChain(userId, symbol, executedAt))
    .then(() => rebuildPortfolio(userId))
}
