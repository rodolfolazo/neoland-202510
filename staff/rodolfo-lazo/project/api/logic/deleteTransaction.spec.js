import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { ExistenceError, OwnershipError } from 'com'

import { connect, disconnect } from '../mongoose/index.js'

import { data, UserData, TransactionData } from '../data/index.js'

import { logic } from './index.js'
import { insertTransaction } from '../data/insertTransaction.js'

describe('deleteTransaction', () => {
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

  it('Succeds on eliminate transaction', () => {
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
            3000,
            0.1,
            1000 * 0.1,
            '2026-04-24T01:00:00Z',
            4000,
          ),
        )
      })
      .then(() => data.findTransactionsByUserId(userId))
      .then(([txData]) => logic.deleteTransaction(userId, txData.id))
      .then(() => data.findTransactionsByUserId(userId))
      .then((result) => {
        expect(result).to.be.empty
      })
  })

  it('Fails to delete transaction on non-existing user', () => {
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
            3000,
            0.1,
            1000 * 0.1,
            '2026-04-24T01:00:00Z',
            4000,
          ),
        )
      })
      .then(() => data.findTransactionsByUserId(userId))
      .then(([txData]) =>
        logic.deleteTransaction('000000001111111122222222', txData.id),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(ExistenceError)
        expect(caught.message).to.equal('user not found')
      })
  })

  it('Fails to delete on non-existing transaction', () => {
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
            3000,
            0.1,
            1000 * 0.1,
            '2026-04-24T01:00:00Z',
            4000,
          ),
        )
      })
      .then(() => data.findTransactionsByUserId(userId))
      .then(([txData]) =>
        logic.deleteTransaction(userId, '000000001111111122222222'),
      )
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(ExistenceError)
        expect(caught.message).to.equal('transaction not found')
      })
  })

  it('Fails to delete on existing user and existing transaction but from different user', () => {
    let userId = null
    let userId2 = null
    let caught = null

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
      .then(() => data.findUserByEmail('admin@example.com'))
      .then((userData) => {
        userId = userData.id
        return data.insertTransaction(
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
        )
      })
      .then(() => data.findUserByEmail('info@example.com'))
      .then((userData2) => {
        userId2 = userData2.id
        return data.findTransactionsByUserId(userId)
      })
      .then(([txData]) => logic.deleteTransaction(userId2, txData.id))
      .catch((error) => (caught = error))
      .finally(() => {
        expect(caught).to.be.instanceOf(OwnershipError)
        expect(caught.message).to.equal('user not owner of transaction')
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
