import bcrypt, { hash } from 'bcryptjs'
import { expect } from 'chai'

import { connect, disconnect } from '../mongoose/index.js'

import { data, UserData } from '../data/index.js'

import { logic } from './index.js'
import { insertTransaction } from '../data/insertTransaction.js'

import { ExistenceError } from 'com'

describe('getUser', () => {
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
  it('Succeeds on existing user', () => {
    return data
      .insertUser(
        new UserData(
          null,
          'Annie',
          'admin@example.com',
          'annie',
          hashed,
          'http:www.image/1',
          'regular',
        ),
      )
      .then(() => data.findUserByUsername('annie'))
      .then((userData) => logic.getUser(userData.id))
      .then((userData) => {
        expect(userData).to.exist
        expect(userData.name).to.equal('Annie')
        expect(userData.email).to.equal('admin@example.com')
        expect(userData.username).to.equal('annie')
      })
  })
  it('Fails on non-existing user', () => {
    let caught = null
    return logic
      .getUser('111111112222222233333333')
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
