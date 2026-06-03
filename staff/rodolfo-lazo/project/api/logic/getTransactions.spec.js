import bcrypt from "bcryptjs";
import { expect } from "chai";

import { connect, disconnect } from "../mongoose/index.js";

import {data, UserData, TransactionData} from '../data/index.js'

import {logic} from './index.js'

describe('getTransactions', () => {
  before(() => connect(process.env.TEST_DB_URL))

  let hashed = null
  let userId = null

  beforeEach(() => Promise.all([
    data.deleteAllUsers(),
    data.deleteAllTransactions(),
    data.deleteAllPortfolios(),
    bcrypt.hash("123123123", 10).then(hash => hashed = hash)
  ]))

  it('Succeeds on getting transactions', () => {
    return data.insertUser(new UserData(null, "Annie", "admin@example.com", "annie123", hashed, "http://www.image.com/1", "regular"))
    .then(() => data.findUserByEmail("admin@example.com"))
    .then(userData => {
      userId = userData.id
      return Promise.all([
        //data.insertTransaction(new TransactionData(null, userData.id, "XRPUSDT", "BUY", 1000, 0.1, 1000*0.1, "2026-04-24T00:00:00Z", 1000)),
        data.insertTransaction(new TransactionData(null, userData.id, "SOLUSDT", "BUY", 20, 100, 20*100, "2026-04-24T01:00:00Z", 20))
        ])
    })
    .then(() => logic.getTransactions(userId))
    .then(([txData1, txData2]) => {
      /* expect(txData1).to.exist
      expect(txData1.symbol).to.equal("XRPUSDT")
      expect(txData1.price).to.equal(0.1)
      expect(txData1.quantity).to.equal(1000)
      expect(txData1.type).to.equal("BUY") */

      expect(txData1).to.exist
      expect(txData1.symbol).to.equal("SOLUSDT")
      expect(txData1.price).to.equal(100)
      expect(txData1.quantity).to.equal(20)
      expect(txData1.type).to.equal("BUY")
    })
  })

  afterEach(() => Promise.all([
    data.deleteAllUsers(),
    data.deleteAllTransactions(),
    data.deleteAllPortfolios()
  ]))
  after(() => disconnect())
})
