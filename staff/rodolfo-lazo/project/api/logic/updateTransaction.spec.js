import bcrypt from 'bcryptjs'
import {expect} from 'chai'

import {connect, disconnect} from '../mongoose/index.js'

import {data, UserData, TransactionData} from '../data/index.js'

import {logic} from './index.js'
import { insertTransaction } from '../data/insertTransaction.js'
import { ExistenceError, OwnershipError } from 'com'

describe('updateTransaction', () => {
  before(() => connect(process.env.TEST_DB_URL))

  let hashed = null
  let userId = null
  let userId2 = null

  beforeEach(()=>Promise.all([
    data.deleteAllUsers(),
    data.deleteAllTransactions(),
    data.deleteAllPortfolios(),
    bcrypt.hash("123123123", 10).then(hash => hashed = hash)
  ]))

  it('Succeds to update transaction', () =>{
    return data.insertUser(
          new UserData(null, "Annie", "admin@example.com", "annie123", hashed, "http://www.image.com/1", "regular"))
    .then(() => data.findUserByEmail("admin@example.com"))
    .then(userData => {
      userId = userData.id
      return data.insertTransaction(
      new TransactionData(null, userId, "XRPUSDT", "BUY", 3000, 0.1, 1000*0.1, "2026-04-24T01:00:00Z", 4000))
    })
    .then(() => data.findTransactionsBySymbol(userId, "XRPUSDT"))
    .then(([txData]) => logic.updateTransaction(userId,txData.id, "SOLUSDT", "BUY", 5,100,"2026-04-25T01:00:00Z"))
    .then(() => data.findTransactionsBySymbol(userId, "SOLUSDT"))
    .then(([txData]) =>{
      expect(txData.symbol).to.equal("SOLUSDT")
    })
  })

  it('Fails on non-existing user', () =>{
    let caught = null
    return data.insertUser(
          new UserData(null, "Annie", "admin@example.com", "annie123", hashed, "http://www.image.com/1", "regular"))
    .then(() => data.findUserByEmail("admin@example.com"))
    .then(userData => {
      userId = userData.id
      return data.insertTransaction(
      new TransactionData(null, userId, "XRPUSDT", "BUY", 3000, 0.1, 1000*0.1, "2026-04-24T01:00:00Z", 4000))
    })
    .then(() => data.findTransactionsBySymbol(userId, "XRPUSDT"))
    .then(([txData]) => logic.updateTransaction("111111112222222233333333",txData.id, "SOLUSDT", "BUY", 5,100,"2026-04-25T01:00:00Z"))
    .catch(error => caught = error)
    .finally(() => {
      expect(caught).to.be.instanceOf(ExistenceError)
      expect(caught.message).to.equal("user not found")
    })
  })

  it('Fails on existing user but non-existing transaction', () =>{
    let caught = null
    return Promise.all([
      data.insertUser(
          new UserData(null, "Annie", "admin@example.com", "annie123", hashed, "http://www.image.com/1", "regular")),
          data.insertUser(
          new UserData(null, "Fernando", "info@example.com", "fer123", hashed, "http://www.image.com/1", "regular"))
    ])
    .then(() => data.findUserByEmail("admin@example.com"))
    .then(userData => {
      userId = userData.id
      return data.insertTransaction(
      new TransactionData(null, userId, "XRPUSDT", "BUY", 3000, 0.1, 1000*0.1, "2026-04-24T01:00:00Z", 4000))
    })
    .then(()=> data.findUserByEmail("info@example.com"))
    .then((userData) => {
      userId2 = userData.id
      return data.findTransactionsBySymbol(userId, "XRPUSDT")
    })
    .then(([txData]) => logic.updateTransaction(userId2, txData.id, "SOLUSDT", "BUY", 5,100,"2026-04-25T01:00:00Z"))
    .catch(error => caught = error)
    .finally(() => {
      expect(caught).to.be.instanceOf(OwnershipError)
      expect(caught.message).to.equal("user not owner of transaction")
    })
  })

  afterEach(() => Promise.all([
    data.deleteAllUsers(),
    data.deleteAllTransactions(),
    data.deleteAllPortfolios()
  ]))
  after(() => disconnect())
})
