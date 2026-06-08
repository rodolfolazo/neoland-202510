import { model } from 'mongoose'
import { transactionSchema } from '../schemas/index.js'

export const TransactionModel = model('Transaction', transactionSchema)
