import bcrypt from 'bcryptjs'

import {
  connect,
  disconnect,
  UserModel,
  PortfolioModel,
  TransactionModel,
} from './mongoose/index.js'

let id1 = null
let id2 = null

connect('mongodb://localhost:27017/crypto')
  .then(() => bcrypt.hash('123123123', 10))
  .then((hash) => {
    const piotr = new UserModel({
      name: 'Piotr Kurshinsky',
      email: 'piotr@mail.com',
      username: 'piotr123',
      password: hash,
      imnage:
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cTkyYWdkMWhsdjhkaXc0d3VidnZxcHdxOGJkN2RqMXl4b2c5cWc4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BoxAtPSUv1olZNtA8n/giphy.gif',
      role: 'regular',
    })
    const rafal = new UserModel({
      name: 'Rafal Oljenik',
      email: 'mrrafal@mail.com',
      username: 'rafal123',
      password: hash,
      imnage:
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cTkyYWdkMWhsdjhkaXc0d3VidnZxcHdxOGJkN2RqMXl4b2c5cWc4YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/nGLW2pQKZllFgZROsV/giphy.gif',
      role: 'regular',
    })

    return Promise.all([piotr.save(), rafal.save()])
  })
  .then(([piotr, rafal]) => {
    id1 = piotr.id
    id2 = rafal.id
    const tx1 = new TransactionModel({
      userId: piotr.id,
      symbol: 'BTCUSDT',
      type: 'BUY',
      quantity: 0.1,
      price: 70000,
      value: 70000 * 0.1,
      executedAt: '2026-05-30T08:00:00Z',
      balanceAfter: 0.1,
    })
    const tx2 = new TransactionModel({
      userId: piotr.id,
      symbol: 'BTCUSDT',
      type: 'BUY',
      quantity: 0.2,
      price: 72300,
      value: 72300 * 0.2,
      executedAt: '2026-05-31T08:00:00Z',
      balanceAfter: 0.3,
    })
    const tx3 = new TransactionModel({
      userId: piotr.id,
      symbol: 'BTCUSDT',
      type: 'SELL',
      quantity: 0.15,
      price: 72000,
      value: 72000 * 0.15,
      executedAt: '2026-06-01T08:00:00Z',
      balanceAfter: 0.15,
    })

    const tx4 = new TransactionModel({
      userId: piotr.id,
      symbol: 'ETHUSDT',
      type: 'BUY',
      quantity: 5,
      price: 2000,
      value: 5 * 2000,
      executedAt: '2026-06-02T08:00:00Z',
      balanceAfter: 5,
    })

    const tx5 = new TransactionModel({
      userId: rafal.id,
      symbol: 'XRPUSDT',
      type: 'BUY',
      quantity: 1000,
      price: 2,
      value: 2 * 1000,
      executedAt: '2026-06-03T08:00:00Z',
      balanceAfter: 1000,
    })

    const tx6 = new TransactionModel({
      userId: rafal.id,
      symbol: 'XRPUSDT',
      type: 'BUY',
      quantity: 2000,
      price: 1.5,
      value: 1.5 * 4000,
      executedAt: '2026-06-03T09:00:00Z',
      balanceAfter: 3000,
    })

    const tx7 = new TransactionModel({
      userId: rafal.id,
      symbol: 'XLMUSDT',
      type: 'BUY',
      quantity: 800,
      price: 1,
      value: 1 * 800,
      executedAt: '2026-06-03T09:00:00Z',
      balanceAfter: 800,
    })

    return Promise.all([
      tx1.save(),
      tx2.save(),
      tx3.save(),
      tx4.save(),
      tx5.save(),
      tx6.save(),
      tx7.save(),
    ])
  })
  .then(() => {
    const portfolio1 = new PortfolioModel({
      userId: id1,
      symbol: 'BTCUSDT',
      quantity: 0.15,
    })
    const portfolio2 = new PortfolioModel({
      userId: id1,
      symbol: 'ETHUSDT',
      quantity: 5,
    })
    const portfolio3 = new PortfolioModel({
      userId: id2,
      symbol: 'XRPUSDT',
      quantity: 3000,
    })
    const portfolio4 = new PortfolioModel({
      userId: id2,
      symbol: 'XLMUSDT',
      quantity: 800,
    })

    return Promise.all([
      portfolio1.save(),
      portfolio2.save(),
      portfolio3.save(),
      portfolio4.save(),
    ])
  })
  .then(([portfolio1, portfolio2, portfolio3, portfolio4]) =>
    console.log(portfolio1, portfolio2, portfolio3, portfolio4),
  )
  .catch((error) => console.error(error))
  .finally(() => disconnect())
