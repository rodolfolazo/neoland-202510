import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { ExistenceError } from 'com'

import { connect, disconnect } from '../mongoose/index.js'

import {
  data,
  UserData,
  TransactionData,
  PortfolioData,
} from '../data/index.js'

import { logic } from './index.js'
import { insertTransaction } from '../data/insertTransaction.js'

describe('getPortfolios', () => {
  before(() => connect(process.env.TEST_DB_URL))

  let hashed = null

  beforeEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
      bcrypt.hash('123123123', 10).then((hash) => (hashed = hash)),
    ]),
  )
  it('Succeds to get complete portfolio', () => {})
  afterEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
    ]),
  )
  after(() => disconnect())
})
