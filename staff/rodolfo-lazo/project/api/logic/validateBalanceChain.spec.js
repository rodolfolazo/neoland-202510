import { expect } from 'chai'

import { TransactionData } from '../data/index.js'

import { logic } from './index.js'

import { BalanceError } from 'com'

describe('validateBalanceChain', () => {

   it("Passes on valid transaction chain", () => {
    const transactionsData = [
      new TransactionData(
        null,
        "665f1a111111111111111111",
        "665f1b111111111111111111",
        "BTC",
        "BUY",
        2,
        50000,
        100000,
        new Date("2025-01-01"),
        2,
      ),

      new TransactionData(
        null,
        "665f1a222222222222222222",
        "665f1b111111111111111111",
        "BTC",
        "SELL",
        1,
        60000,
        60000,
        new Date("2025-01-02"),
        1,
      ),
    ];

    expect(() => logic.validateBalanceChain(transactionsData)).to.not.throw();
  });

  it("Sorts correctly by executedAt before validating", () => {
    const transactionsData = [
      new TransactionData(
        null,
        "665f1a222222222222222222",
        "665f1b111111111111111111",
        "BTC",
        "SELL",
        1,
        60000,
        60000,
        new Date("2025-01-02"),
        0,
      ),

      new TransactionData(
        null,
        "665f1a111111111111111111",
        "665f1b111111111111111111",
        "BTC",
        "BUY",
        2,
        50000,
        100000,
        new Date("2025-01-01"),
        2,
      ),
    ];

    expect(() => logic.validateBalanceChain(transactionsData)).to.not.throw();
  })

  it("Fails when SELL transaction exceeds balance", () => {
    const transactionsData = [
      new TransactionData(
        "665f1a111111111111111111",
        "665f1b111111111111111111",
        "BTC",
        "BUY",
        2,
        5,
        10,
        new Date("2025-01-01"),
        2,
      ),

      new TransactionData(
        "665f1a222222222222222222",
        "665f1b111111111111111111",
        "BTC",
        "SELL",
        3,
        6,
        18,
        new Date("2025-01-02"),
        0,
      ),
    ];

    expect(() => logic.validateBalanceChain(transactionsData)).to.throw(BalanceError,
      "not enough balance at this point in history");
  });

})

