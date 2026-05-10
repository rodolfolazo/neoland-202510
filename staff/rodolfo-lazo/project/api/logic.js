import bcrypt from "bcryptjs";

import { data, UserData, TransactionData } from "./data.js";

import {
  validate,
  DuplicityError,
  ExistenceError,
  CredentialError,
  OwnershipError,
  SystemError,
  ValidationError,
} from "com";

export class User {
  constructor(id, name, email, username, image, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.image = image;
    this.role = role;
  }
}

export class Portfolio {
  constructor(id, userId, symbol, quantity) {
    this.id = id;
    this.userId = userId;
    this.symbol = symbol;
    this.quantity = quantity;
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
    this.id = id;
    this.userId = userId;
    this.symbol = symbol;
    this.type = type;
    this.quantity = quantity;
    this.price = price;
    this.value = value;
    this.executedAt = executedAt;
    this.balanceAfter = balanceAfter;
  }
}

class Logic {
  registerUser(name, email, username, password, passwordRepeat, image) {
    validate.name(name);
    validate.email(email, "email");
    validate.username(username);
    validate.password(password, "password");
    validate.password(passwordRepeat, "passwordRepeat");
    validate.match(password, passwordRepeat, "password", "passwordRepeat");
    validate.url(image, "image");

    return data
      .findUserByEmail(email)
      .then((userData) => {
        if (userData) throw new DuplicityError("user email already exists");
        return data.findUserByUsername(username);
      })
      .then((userData) => {
        if (userData) throw new DuplicityError("user username already exists");

        return bcrypt.hash(password, 10).catch((error) => {
          throw new SystemError(error.message);
        });
      })
      .then((hash) => {
        const userData = new UserData(
          null,
          name,
          email,
          username,
          hash,
          image,
          "regular",
        );
        return data.insertUser(userData);
      });
  }

  authenticateUser(username, password) {
    validate.username(username);
    validate.password(password);

    return data.findUserByUsername(username).then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      return bcrypt
        .compare(password, userData.password)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((match) => {
          if (!match) throw new CredentialError("incorrect password");
          return userData.id;
        });
    });
  }

  getUser(userId) {
    validate.id(userId, "userId");

    return data.findUserById(userId).then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      const { name, email, username, image, role } = userData;
      return new User(userId, name, email, username, image, role);
    });
  }

  addTransaction(userId, symbol, type, quantity, price, date) {
    validate.id(userId, "userId");
    validate.ticker(symbol, "symbol");
    validate.type(type, "type");
    validate.number(quantity, "quantity");
    validate.number(price, "price");
    validate.date(date, "date");

    if (!["BUY", "SELL"].includes(type))
      throw new ValidationError("invalid transaction type");

    return data.findUserById(userId).then((userData) => {
      if (!userData) throw new ExistenceError("user not found");

      const value = quantity * price;

      const tx = new TransactionData(
        null,
        userId,
        symbol,
        type,
        quantity,
        price,
        value,
        date,
        null,
      );

      return data
        .insertTransaction(tx)
        .then(() => data.rebuildPortfolio(userId));
    });
  }

  getTransactions(userId) {
    validate.id(userId, "userId");

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError("user not found");
        return data.findTransactionsByUserId(userId);
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
      );
  }

  getTransactionsBySymbol(userId, symbol) {
    validate.id(userId, "userId");
    validate.ticker(symbol, "symbol");

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");
        return data.findTransactionsBySymbol(userId, symbol);
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
      );
  }

  getTransaction(userId, transactionId) {
    validate.id(userId, "userId");
    validate.id(transactionId, "transactionId");

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");
        return data.findTransactionById(transactionId);
      })
      .then((tx) => {
        if (!tx) throw new ExistenceError("transaction not found");
        if (tx.userId !== userId)
          throw new OwnershipError("user not owner of transaction");

        const {
          id,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        } = tx;

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
        );
      });
  }

  updateTransaction(
    userId,
    transactionId,
    symbol,
    type,
    quantity,
    price,
    date,
  ) {
    validate.id(userId);
    validate.id(transactionId);

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");
        return data.findTransactionById(transactionId);
      })
      .then((tx) => {
        if (!tx) throw new ExistenceError("transaction not found");
        if (tx.userId !== userId)
          throw new OwnershipError("user not owner of transaction");

        const value = quantity * price;

        const updated = new TransactionData(
          transactionId,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          date,
          null,
        );

        return data
          .updateTransaction(updated)
          .then(() => data.rebuildPortfolio(userId));
      });
  }

  deleteTransaction(userId, transactionId) {
    validate.id(userId);
    validate.id(transactionId);

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");
        return data.findTransactionById(transactionId);
      })
      .then((tx) => {
        if (!tx) throw new ExistenceError("transaction not found");
        if (tx.userId !== userId)
          throw new OwnershipError("user not owner of transaction");

        return data
          .deleteTransaction(transactionId)
          .then(() => data.rebuildPortfolio(userId));
      });
  }

  getPortfolios(userId) {
    validate.id(userId, "userId");

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError("user not found");
        return data.findPortfoliosByUserId(userId);
      })
      .then((items) =>
        items.map(
          ({ id, userId, symbol, quantity }) =>
            new Portfolio(id, userId, symbol, quantity),
        ),
      );
  }

  rebuildPortfolio(userId) {
    return data.rebuildPortfolio(userId);
  }
}

export const logic = new Logic();
