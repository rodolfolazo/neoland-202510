import { TransactionModel } from '../mongoose/index.js'
import { SystemError } from 'com'

export function deleteTransaction(transactionId) {
  return TransactionModel.deleteOne({ _id: transactionId })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(() => {})
}
