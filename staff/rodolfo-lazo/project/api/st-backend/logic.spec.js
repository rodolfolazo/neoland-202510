import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { database } from './models.js'

import { logic, User, Portfolio, Transaction } from './logic.js'
import { data, UserData, PortfolioData, TransactionData } from './data.js'
import {
  CredentialError,
  DuplicityError,
  ExistenceError,
  OwnershipError,
  ValidationError,
} from 'com'

describe('logic', () => {
  before(() => database.connect(process.env.TEST_DB_URL))

  let hashed = null

  beforeEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllPortfolios(),
      data.deleteAllTransactions(),
      bcrypt.hash('123123123', 10).then((hash) => (hashed = hash)),
    ]),
  )

  describe('registerUser', () => {
    it('Registers a user succesfully', () => {
      return logic
        .registerUser(
          'Annie',
          'annie@example.com',
          'annie',
          '123123123',
          '123123123',
        )
        .then(() => data.findUserByUsername('annie'))
        .then((userData) => {
          expect(userData).to.exist
          expect(userData.name).to.equal('Annie')
          expect(userData.email).to.equal('annie@example.com')
          expect(userData.username).to.equal('annie')
          return bcrypt.compare('123123123', userData.password)
        })
        .then((match) => {
          expect(match).to.be.true
        })
    })

    it('Fails on existing user with same email', () => {
      let caught = null
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() =>
          logic.registerUser(
            'Fernando',
            'admin@example.com',
            'fernando',
            '123123123',
            '123123123',
          ),
        )
        .catch((error) => (caught = error))
        .finally(() => {
          expect(caught).to.be.instanceOf(DuplicityError)
          expect(caught.message).to.equal('user email already exists')
        })
    })

    it('Fails on existing user with same username', () => {
      let caught = null
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'admin',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() =>
          logic.registerUser(
            'Fernando',
            'admin@example.com',
            'admin',
            '123123123',
            '123123123',
          ),
        )
        .catch((error) => (caught = error))
        .finally(() => {
          expect(caught).to.be.instanceOf(DuplicityError)
          expect(caught.message).to.equal('user email already exists')
        })
    })
  })

  describe('authenticateUser', () => {
    it('Authenticate a user succesfully', () => {
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() => logic.authenticateUser('annie', '123123123'))
        .then((userId) => {
          expect(userId).to.be.a.string
          expect(userId).to.have.lengthOf(24)
        })
    })

    it('Fails on non-existing user', () => {
      let caught = null
      return logic
        .authenticateUser('annie', '123123123')
        .catch((error) => (caught = error))
        .finally(() => {
          expect(caught).to.be.instanceOf(ExistenceError)
          expect(caught.message).to.equal('user not found')
        })
    })

    it('Fails on incorrect password', () => {
      let caught = null
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() => logic.authenticateUser('annie', '123123111'))
        .catch((error) => (caught = error))
        .finally(() => {
          expect(caught).to.be.instanceOf(CredentialError)
          expect(caught.message).to.be.a.string('incorrect password')
        })
    })
  })

  describe('getUser', () => {
    it('Succesfully get user', () => {
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() => {
          return data.findUserByEmail('admin@example.com')
        })
        .then((userData) => {
          return logic.getUser(userData.id)
        })
        .then((user) => {
          expect(user.name).to.be.a.string('Annie')
        })
    })

    it('Fails non existing user', () => {
      let caught = null
      return logic
        .getUser('111111111122222222223333')
        .catch((error) => {
          caught = error
        })
        .finally(() => {
          expect(caught).to.be.instanceOf(ExistenceError)
          expect(caught.message).to.be.a.string('user not found')
        })
    })
  })

  describe('addTransaction', () => {
    it('Add transaction succesfully', () => {
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() => data.findUserByUsername('annie'))
        .then((userData) => {
          return logic
            .addTransaction(
              userData.id,
              'ETHUSDT',
              'BUY',
              0.5,
              2145.32,
              '2026-05-09',
            )
            .then(() => data.findTransactionsByUserId(userData.id))
            .then((txs) => {
              expect(txs).to.have.lengthOf(1)
              const [tx] = txs
              expect(tx.symbol).to.be.a.string('ETHUSDT')
              expect(tx.type).to.be.a.string('BUY')
              expect(tx.quantity).to.equal(0.5)
              expect(tx.price).to.equal(2145.32)
              expect(tx.executedAt.getFullYear()).to.equal(2026)
              expect(tx.executedAt.getMonth()).to.equal(4)
              expect(tx.executedAt.getDate()).to.equal(9)
            })
        })
    })

    it('Fails when there is not enough balance', () => {
      let caught = null
      return data
        .insertUser(
          new UserData(
            null,
            'Annie',
            'admin@example.com',
            'annie',
            hashed,
            'http://www.google.com',
            'regular',
          ),
        )
        .then(() => data.findUserByEmail('admin@example.com'))
        .then((userData) => {
          return logic.addTransaction(
            userData.id,
            'ETHUSDT',
            'SELL',
            0.5,
            2145.32,
            '2026-05-09',
          )
        })
        .catch((error) => (caught = error))
        .finally(() => {
          expect(caught).to.be.instanceOf(ValidationError)
          expect(caught.message).to.equal(
            'not enough balance at this point in history',
          )
        })
    })
  })

  afterEach(() =>
    Promise.all([
      data.deleteAllUsers(),
      data.deleteAllPortfolios(),
      data.deleteAllTransactions(),
    ]),
  )

  after(() => database.disconnect())
})
