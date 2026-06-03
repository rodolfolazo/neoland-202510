import { data, TransactionData } from "../data/index.js";
import { ExistenceError, OwnershipError, validate } from 'com';
import { validateBalanceChain} from './validateBalanceChain.js'
import {calculateBalanceChain} from './calculateBalanceChain.js'
import { rebuildPortfolio} from './rebuildPortfolio.js'



export function updateTransaction(userId, transactionId, symbol, type, quantity, price, executedAt) {
  validate.id(userId, "userId");
  validate.id(transactionId, "transactionId");
  validate.ticker(symbol, "symbol");
  validate.type(type, "type");
  validate.number(quantity, "quantity");
  validate.number(price, "price");

  let oldTransaction = null;
  let newTransaction = null;
  const arr = []
  let transactionsOldSymbol = []
  let transactionsNewSymbol = []

  return data
    .findUserById(userId)
    .then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      return data.findTransactionById(transactionId);
    })
    .then((transactionData) => {
      if (!transactionData)
        throw new ExistenceError("transaction not found");

      if (transactionData.userId !== userId)
        throw new OwnershipError("user not owner of transaction");

      oldTransaction = transactionData;
      newTransaction = new TransactionData(oldTransaction.id, userId, symbol, type, quantity, price, quantity*price, executedAt, 0)

      //Recupero la lista de transacciones del cripto original
      arr.push(data.findTransactionsBySymbol(userId, oldTransaction.symbol))

      //Recupero la lista de transacciones del nuevo cripto elegido si se ha cambiado el cripto
      if ( oldTransaction.symbol !== newTransaction.symbol)
        arr.push(data.findTransactionsBySymbol(userId, newTransaction.symbol))

      return Promise.all(arr)
    })
    .then(results =>{
      transactionsOldSymbol = results[0]
      transactionsNewSymbol = results[1] || []

      if (results.length === 1){
        transactionsOldSymbol = transactionsOldSymbol.filter(tx => tx.id !== transactionsOldSymbol.id)
        transactionsOldSymbol.push(newTransaction)
        validateBalanceChain(transactionsOldSymbol)
      }else{
        transactionsOldSymbol = transactionsOldSymbol.filter(tx => tx.id !== transactionsOldSymbol.id)
        validateBalanceChain(transactionsOldSymbol)
        transactionsNewSymbol.push(newTransaction)
        validateBalanceChain(transactionsNewSymbol)
      }

      return data.updateTransaction(newTransaction)

    })
    .then(() => {
      const arrBalance = []
      arrBalance.push(calculateBalanceChain(userId, oldTransaction.symbol, executedAt))

      if (transactionsNewSymbol.length === 2){
        arrBalance.push(calculateBalanceChain(userId, newTransaction.symbol, executedAt))
      }

      return Promise.all(arrBalance)

    })
    .then(() => rebuildPortfolio(userId))
}
