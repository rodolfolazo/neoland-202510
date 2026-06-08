import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { connect, disconnect } from '../mongoose/index.js'

import { data, UserData, TransactionData } from '../data/index.js'

import { logic } from './index.js'

import { ExistenceError } from 'com'
import { insertTransaction } from '../data/insertTransaction.js'

describe('getTransactionsBySymbol', () => {
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

  it('Success getting all transactions from a specified crypto', () => {
    let userId = null

    return data
      .insertUser(
        new UserData(
          null,
          'Annie',
          'admin@example.com',
          'annie123',
          hashed,
          'http://www.image.com/1',
          'regular',
        ),
      )
      .then(() => data.findUserByEmail('admin@example.com'))
      .then((userData) => {
        userId = userData.id
        return data.insertTransaction(
          new TransactionData(
            null,
            userId,
            'XRPUSDT',
            'BUY',
            1000,
            0.1,
            1000 * 0.1,
            '2026-04-24T00:00:00Z',
            1000,
          ),
        )
      })
      .then(() =>
        data.insertTransaction(
          new TransactionData(
            null,
            userId,
            'XRPUSDT',
            'BUY',
            3000,
            0.1,
            1000 * 0.1,
            '2026-04-24T01:00:00Z',
            4000,
          ),
        ),
      )
      .then(() => logic.getTransactionsBySymbol(userId, 'XRPUSDT'))
      .then(([txData1, txData2]) => {
        expect(txData1).to.exist
        expect(txData2).to.exist
      })
  })

  it('Fails on non-existing user', () => {
    let userId = null
    let caught = null

    return data
      .insertUser(
        new UserData(
          null,
          'Annie',
          'admin@example.com',
          'annie123',
          hashed,
          'http://www.image.com/1',
          'regular',
        ),
      )
      .then(() => data.findUserByEmail('admin@example.com'))
      .then((userData) => {
        userId = userData.id
        return data.insertTransaction(
          new TransactionData(
            null,
            userId,
            'XRPUSDT',
            'BUY',
            1000,
            0.1,
            1000 * 0.1,
            '2026-04-24T00:00:00Z',
            1000,
          ),
        )
      })
      .then(() =>
        data.insertTransaction(
          new TransactionData(
            null,
            userId,
            'XRPUSDT',
            'BUY',
            3000,
            0.1,
            1000 * 0.1,
            '2026-04-24T01:00:00Z',
            4000,
          ),
        ),
      )
      .then(() =>
        logic.getTransactionsBySymbol('111111112222222233333333', 'XRPUSDT'),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(ExistenceError)
        expect(caught.message).to.equal('user not found')
      })
  })

  afterEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
    ]),
  )
  after(() => disconnect())
})
