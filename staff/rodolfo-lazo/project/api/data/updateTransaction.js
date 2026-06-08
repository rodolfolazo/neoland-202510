import { TransactionModel } from '../mongoose/index.js'
import { SystemError } from 'com'

export function updateTransaction(transactionData) {
  return TransactionModel.updateOne(
    { _id: transactionData.id },
    { $set: transactionData },
  )
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(() => {})
}
