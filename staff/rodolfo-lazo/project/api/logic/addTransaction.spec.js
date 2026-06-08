import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { connect, disconnect } from '../mongoose/index.js'

import { data, UserData, TransactionData } from '../data/index.js'

import { logic } from './index.js'

import { CredentialError, DuplicityError, ExistenceError } from 'com'

describe('addTransaction', () => {
  before(() => connect(process.env.TEST_DB_URL))

  let hashed = null
  let userId = null

  beforeEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllTransactions(),
      data.deleteAllPortfolios(),
      bcrypt.hash('123123123', 10).then((hash) => (hashed = hash)),
    ]),
  )

  it('Succeds adding a transaction', () => {
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
        return logic.addTransaction(
          userId,
          'XRPUSDT',
          'BUY',
          1000,
          0.1,
          '2026-04-24T00:00:00Z',
        )
      })
      .then(() => data.findTransactionsBySymbol(userId, 'XRPUSDT'))
      .then(([txData]) => {
        expect(txData).to.exist
        expect(txData.symbol).to.equal('XRPUSDT')
        expect(txData.type).to.equal('BUY')
        expect(txData.quantity).to.equal(1000)
        expect(txData.price).to.equal(0.1)
      })
  })

  it('Fails on non-existing user', () => {
    let caught = null
    return logic
      .addTransaction(
        '111111112222222233333333',
        'XRPUSDT',
        'BUY',
        1000,
        0.1,
        '2026-04-24T00:00:00Z',
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
