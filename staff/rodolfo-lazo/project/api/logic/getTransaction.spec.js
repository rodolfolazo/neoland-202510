import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { connect, disconnect } from '../mongoose/index.js'

import { data, UserData, TransactionData } from '../data/index.js'

import { logic } from './index.js'

import { ExistenceError, OwnershipError } from 'com'

describe('getTransaction', () => {
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

  it('Succedd to get transaction', () => {
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
            userData.id,
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
      .then(() => data.findTransactionsBySymbol(userId, 'XRPUSDT'))
      .then(([txData]) => logic.getTransaction(userId, txData.id))
      .then((transactionData) => {
        expect(transactionData.symbol).to.equal('XRPUSDT')
      })
  })

  it('Fails on non-existing user', () => {
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
            userData.id,
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
      .then(() => data.findTransactionsBySymbol(userId, 'XRPUSDT'))
      .then(([txData]) =>
        logic.getTransaction('111111112222222233333333', txData.id),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(ExistenceError)
        expect(caught.message).to.equal('user not found')
      })
  })

  it('Fails on existing user and existing transaction from different user', () => {
    let caught = null
    let userId1 = null
    let userId2 = null

    return Promise.all([
      data.insertUser(
        new UserData(
          null,
          'Annie',
          'admin@example.com',
          'annie123',
          hashed,
          'http://www.image.com/1',
          'regular',
        ),
      ),
      data.insertUser(
        new UserData(
          null,
          'Fernando',
          'info@example.com',
          'fer123',
          hashed,
          'http://www.image.com/1',
          'regular',
        ),
      ),
    ])
      .then(() =>
        Promise.all([
          data.findUserByEmail('admin@example.com'),
          data.findUserByEmail('info@example.com'),
        ]),
      )
      .then(([user1, user2]) => {
        userId1 = user1.id
        userId2 = user2.id
        return data.insertTransaction(
          new TransactionData(
            null,
            user1.id,
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
      .then(() => data.findTransactionsBySymbol(userId1, 'XRPUSDT'))
      .then(([txData]) => logic.getTransaction(userId2, txData.id))
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(OwnershipError)
      })
  })

  it('Fails on existing user and non existing transaction', () => {
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
      .then((userData) =>
        logic.getTransaction(userData.id, '111111112222222233333333'),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(ExistenceError)
        expect(caught.message).to.equal('transaction not found')
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
