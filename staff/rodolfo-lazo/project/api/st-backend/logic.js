import bcrypt from 'bcryptjs'

import { data, UserData, PortfolioData, TransactionData } from './data.js'

import {
  validate,
  DuplicityError,
  ExistenceError,
  CredentialError,
  OwnershipError,
  SystemError,
  ValidationError,
} from 'com'

export class User {
  constructor(id, name, email, username, image, role) {
    this.id = id
    this.name = name
    this.email = email
    this.username = username
    this.image = image
    this.role = role
  }
}

export class Portfolio {
  constructor(id, userId, symbol, quantity) {
    this.id = id
    this.userId = userId
    this.symbol = symbol
    this.quantity = quantity
  }
}

export class Transaction {
  constructor(
    id,
    userId,
    symbol,
    type,
    quantity,
    price,
    value,
    executedAt,
    balanceAfter,
  ) {
    this.id = id
    this.userId = userId
    this.symbol = symbol
    this.type = type
    this.quantity = quantity
    this.price = price
    this.value = value
    this.executedAt = executedAt
    this.balanceAfter = balanceAfter
  }
}

class Logic {
  registerUser(
    name,
    email,
    username,
    password,
    passwordRepeat,
    image = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3lyMXl0YWRqcWNtcGx2aG5oYzc2NDB5ajhiYjliY3d2Z212ZDhwNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tRnwzleS2SsVi/giphy.gif',
    role = 'regular',
  ) {
    validate.name(name)
    validate.email(email, 'email')
    validate.username(username)
    validate.password(password, 'password')
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.match(password, passwordRepeat, 'password', 'passwordRepeat')
    validate.url(image, 'image')

    return data
      .findUserByEmail(email)
      .then((userData) => {
        if (userData) throw new DuplicityError('user email already exists')

        return data.findUserByUsername(username)
      })
      .then((userData) => {
        if (userData) throw new DuplicityError('user username already exists')

        return bcrypt.hash(password, 10).catch((error) => {
          throw new SystemError(error.message)
        })
      })
      .then((hash) => {
        const userData = new UserData(
          null,
          name,
          email,
          username,
          hash,
          image,
          role,
        )

        return data.insertUser(userData)
      })
  }

  authenticateUser(username, password) {
    validate.username(username)
    validate.password(password)

    return data.findUserByUsername(username).then((userData) => {
      if (!userData) throw new ExistenceError('user not found')

      return bcrypt
        .compare(password, userData.password)
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((match) => {
          if (!match) throw new CredentialError('incorrect password')

          return userData.id
        })
    })
  }

  getUser(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId).then((userData) => {
      if (!userData) throw new ExistenceError('user not found')

      const { name, email, username, image, role } = userData

      return new User(userId, name, email, username, image, role)
    })
  }

  validateBalanceChain(transactions) {
    let balance = 0

    transactions
      .sort((a, b) => {
        const executedAtDiff = new Date(a.executedAt) - new Date(b.executedAt)

        if (executedAtDiff !== 0) return executedAtDiff

        return a.id.localeCompare(b.id)
      })
      .forEach((transaction) => {
        if (transaction.type === 'BUY') {
          balance += transaction.quantity
        } else {
          if (balance < transaction.quantity)
            throw new ValidationError(
              'not enough balance at this point in history',
            )

          balance -= transaction.quantity
        }
      })
  }

  calculateBalanceChain(userId, symbol, startExecutedAt) {
    let previousBalance = 0

    return data
      .findPreviousTransaction(userId, symbol, startExecutedAt)
      .then((previousTransaction) => {
        if (previousTransaction)
          previousBalance = previousTransaction.balanceAfter

        return data.findTransactionsFromDate(userId, symbol, startExecutedAt)
      })
      .then((transactions) => {
        let chain = Promise.resolve()
        let balance = previousBalance

        transactions.forEach((transaction) => {
          chain = chain.then(() => {
            const delta =
              transaction.type === 'BUY'
                ? transaction.quantity
                : -transaction.quantity

            if (transaction.type === 'SELL' && balance < transaction.quantity)
              throw new ValidationError(
                'not enough balance at this point in history',
              )

            balance += delta

            const updatedTransaction = new TransactionData(
              transaction.id,
              transaction.userId,
              transaction.symbol,
              transaction.type,
              transaction.quantity,
              transaction.price,
              transaction.value,
              transaction.executedAt,
              balance,
            )

            return data.updateTransaction(updatedTransaction)
          })
        })

        return chain
      })
  }

  rebuildPortfolio(userId) {
    const portfolioMap = new Map()

    return data.findTransactionsByUserId(userId).then((transactions) => {
      transactions
        .sort((a, b) => {
          const executedAtDiff = new Date(a.executedAt) - new Date(b.executedAt)

          if (executedAtDiff !== 0) return executedAtDiff

          return a.id.localeCompare(b.id)
        })
        .forEach((transaction) => {
          const current = portfolioMap.get(transaction.symbol) || 0

          const delta =
            transaction.type === 'BUY'
              ? transaction.quantity
              : -transaction.quantity

          portfolioMap.set(transaction.symbol, current + delta)
        })

      const portfolio = []

      portfolioMap.forEach((quantity, symbol) => {
        if (quantity <= 0) return

        portfolio.push(new PortfolioData(null, userId, symbol, quantity))
      })

      return data.replacePortfolio(userId, portfolio)
    })
  }

  addTransaction(userId, symbol, type, quantity, price, executedAt) {
    validate.id(userId, 'userId')
    validate.ticker(symbol, 'symbol')
    validate.type(type, 'type')
    validate.number(quantity, 'quantity')
    validate.number(price, 'price')
    //validate.date(executedAt, "executedAt");

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError('user not found')

        return data.findPreviousTransaction(userId, symbol, executedAt)
      })
      .then((previousTransaction) => {
        const previousBalance = previousTransaction
          ? previousTransaction.balanceAfter
          : 0

        if (type === 'SELL' && previousBalance < quantity)
          throw new ValidationError(
            'not enough balance at this point in history',
          )

        const delta = type === 'BUY' ? quantity : -quantity

        const balanceAfter = previousBalance + delta

        const value = quantity * price

        const transaction = new TransactionData(
          null,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          new Date(executedAt),
          balanceAfter,
        )

        return data.insertTransaction(transaction)
      })
      .then(() => this.calculateBalanceChain(userId, symbol, executedAt))
      .then(() => this.rebuildPortfolio(userId))
  }

  getTransactions(userId) {
    validate.id(userId, 'userId')

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError('user not found')

        return data.findTransactionsByUserId(userId)
      })
      .then((items) =>
        items.map(
          ({
            id,
            userId,
            symbol,
            type,
            quantity,
            price,
            value,
            executedAt,
            balanceAfter,
          }) =>
            new Transaction(
              id,
              userId,
              symbol,
              type,
              quantity,
              price,
              value,
              executedAt,
              balanceAfter,
            ),
        ),
      )
  }

  getTransactionsBySymbol(userId, symbol) {
    validate.id(userId, 'userId')
    validate.ticker(symbol, 'symbol')

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError('user not found')

        return data.findTransactionsBySymbol(userId, symbol)
      })
      .then((items) =>
        items.map(
          ({
            id,
            userId,
            symbol,
            type,
            quantity,
            price,
            value,
            executedAt,
            balanceAfter,
          }) =>
            new Transaction(
              id,
              userId,
              symbol,
              type,
              quantity,
              price,
              value,
              executedAt,
              balanceAfter,
            ),
        ),
      )
  }

  getTransaction(userId, transactionId) {
    validate.id(userId, 'userId')
    validate.id(transactionId, 'transactionId')

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError('user not found')

        return data.findTransactionById(transactionId)
      })
      .then((transaction) => {
        if (!transaction) throw new ExistenceError('transaction not found')

        if (transaction.userId !== userId)
          throw new OwnershipError('user not owner of transaction')

        const {
          id,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        } = transaction

        return new Transaction(
          id,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        )
      })
  }

  updateTransaction(
    userId,
    transactionId,
    symbol,
    type,
    quantity,
    price,
    executedAt,
  ) {
    validate.id(userId, 'userId')
    validate.id(transactionId, 'transactionId')
    validate.ticker(symbol, 'symbol')
    validate.type(type, 'type')
    validate.number(quantity, 'quantity')
    validate.number(price, 'price')
    //validate.date(executedAt, "executedAt");

    let oldTransaction

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError('user not found')

        return data.findTransactionById(transactionId)
      })
      .then((existingTransaction) => {
        if (!existingTransaction)
          throw new ExistenceError('transaction not found')

        if (existingTransaction.userId !== userId)
          throw new OwnershipError('user not owner of transaction')

        oldTransaction = existingTransaction

        return data.findPreviousTransaction(userId, symbol, executedAt)
      })
      .then((previousTransaction) => {
        const previousBalance = previousTransaction
          ? previousTransaction.balanceAfter
          : 0

        if (type === 'SELL' && previousBalance < quantity)
          throw new ValidationError(
            'not enough balance at this point in history',
          )

        const delta = type === 'BUY' ? quantity : -quantity

        const balanceAfter = previousBalance + delta

        const value = quantity * price

        const updatedTransaction = new TransactionData(
          transactionId,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          new Date(executedAt),
          balanceAfter,
        )

        return data.updateTransaction(updatedTransaction)
      })
      .then(() => {
        const recalculations = []

        recalculations.push(
          this.calculateBalanceChain(
            userId,
            oldTransaction.symbol,
            oldTransaction.executedAt,
          ),
        )

        if (
          oldTransaction.symbol !== symbol ||
          new Date(oldTransaction.executedAt).getTime() !==
            new Date(executedAt).getTime()
        ) {
          recalculations.push(
            this.calculateBalanceChain(userId, symbol, executedAt),
          )
        }

        return Promise.all(recalculations)
      })
      .then(() => this.rebuildPortfolio(userId))
  }

  deleteTransaction(userId, transactionId) {
    validate.id(userId, 'userId')
    validate.id(transactionId, 'transactionId')

    let deletedTransaction

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError('user not found')

        return data.findTransactionById(transactionId)
      })
      .then((transaction) => {
        if (!transaction) throw new ExistenceError('transaction not found')

        if (transaction.userId !== userId)
          throw new OwnershipError('user not owner of transaction')

        deletedTransaction = transaction

        return data.findTransactionsBySymbol(
          deletedTransaction.userId,
          deletedTransaction.symbol,
        )
      })
      .then((transactions) => {
        const simulatedTransactions = transactions.filter(
          (tx) => tx.id !== transactionId,
        )

        this.validateBalanceChain(simulatedTransactions)
      })
      .then(() => data.deleteTransaction(transactionId))
      .then(() =>
        this.calculateBalanceChain(
          deletedTransaction.userId,
          deletedTransaction.symbol,
          deletedTransaction.executedAt,
        ),
      )
      .then(() => this.rebuildPortfolio(userId))
  }

  getPortfolios(userId) {
    validate.id(userId, 'userId')

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError('user not found')

        return data.findPortfoliosByUserId(userId)
      })
      .then((items) =>
        items.map(
          ({ id, userId, symbol, quantity }) =>
            new Portfolio(id, userId, symbol, quantity),
        ),
      )
  }
}

export const logic = new Logic()
