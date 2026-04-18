import bcrypt from "bcryptjs";

import { data, UserData, PortfolioData, TransactionData } from "./data.js";

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
  constructor(id, userId, symbol, type, quantity, price, value, executedAt) {
    this.id = id;
    this.userId = userId;
    this.symbol = symbol;
    this.type = type;
    this.quantity = quantity;
    this.price = price;
    this.value = value;
    this.executedAt = executedAt;
  }
}

class Logic {
  registerUser(
    name,
    email,
    username,
    password,
    passwordRepeat,
    image = "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
  ) {
    validate.name(name);
    validate.email(email, "email");
    validate.username(username);
    validate.password(password, "password");
    validate.password(passwordRepeat, "passwordRepeat");
    validate.match(password, passwordRepeat, "password", "passwordRepeat");
    validate.url(image, "image");

    return data
      .findUserByEmail(email)
      .then((user) => {
        if (user) throw new DuplicityError("user email already exists");
        return data.findUserByUsername(username);
      })
      .then((user) => {
        if (user) throw new DuplicityError("user username already exists");

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

    return data.findUserByUsername(username).then((user) => {
      if (!user) throw new ExistenceError("user not found");

      return bcrypt
        .compare(password, user.password)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((match) => {
          if (!match) throw new CredentialError("incorrect password");
          return user.id;
        });
    });
  }

  getUser(userId) {
    validate.id(userId, "userId");

    return data.findUserById(userId).then((user) => {
      if (!user) throw new ExistenceError("user not found");

      const { name, email, username, image, role } = user;

      return new User(userId, name, email, username, image, role);
    });
  }

  getPortfolio(userId) {
    validate.id(userId, "userId");

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError("user not found");

        return data.findPortfolioByUserId(userId);
      })
      .then((items) =>
        items.map(
          ({ id, userId, symbol, quantity }) =>
            new Portfolio(id, userId, symbol, quantity),
        ),
      );
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
          ({ id, userId, symbol, type, quantity, price, value, executedAt }) =>
            new Transaction(
              id,
              userId,
              symbol,
              type,
              quantity,
              price,
              value,
              executedAt,
            ),
        ),
      );
  }

  addTransaction(userId, symbol, type, quantity, price) {
    validate.id(userId, "userId");
    validate.ticker(symbol, "symbol");
    validate.type(type, "type");
    validate.number(quantity, "quantity");
    validate.number(price, "price");

    if (!["BUY", "SELL"].includes(type))
      throw new ValidationError("invalid transaction type");

    let portfolioItem;

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError("user not found");

        return data.findPortfolioItem(userId, symbol);
      })
      .then((item) => {
        portfolioItem = item;

        if (type === "SELL") {
          const currentQuantity = portfolioItem ? portfolioItem.quantity : 0;

          if (quantity > currentQuantity)
            throw new ValidationError("not enough balance");
        }

        const value = quantity * price;

        const transaction = new TransactionData(
          null,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          new Date(),
        );

        return data
          .insertTransaction(transaction)
          .then(() => {
            const change = type === "BUY" ? quantity : -quantity;

            return data.updatePortfolio(userId, symbol, change);
          })
          .then(() => {
            return data.deletePortfolioIfZero(userId, symbol);
          });
      });
  }

  rebuildPortfolio(userId) {
    return data
      .findTransactionsByUserId(userId)
      .then((transactions) => {
        return data.deletePortfolioByUserId(userId).then(() => transactions);
      })
      .then((transactions) => {
        const ops = [];
        for (const t of transactions) {
          const change = t.type === "BUY" ? t.quantity : -t.quantity;
          ops.push(data.upsertPortfolio(userId, t.symbol, change));
        }

        return Promise.all(ops);
      });
  }

  updateTransaction(userId, transactionId, updates) {
    validate.id(userId);
    validate.id(transactionId);

    return data
      .findTransactionById(transactionId)
      .then((tx) => {
        if (!tx) throw new ExistenceError("transaction not found");
        if (tx.userId !== userId) throw new OwnershipError();

        return data.updateTransaction(transactionId, updates);
      })
      .then(() => this.rebuildPortfolio(userId));
  }

  deleteTransaction(userId, transactionId) {
    validate.id(userId);
    validate.id(transactionId);

    return data
      .findTransactionById(transactionId)
      .then((tx) => {
        if (!tx) throw new ExistenceError("transaction not found");
        if (tx.userId !== userId) throw new OwnershipError();

        return data.deleteTransaction(transactionId);
      })
      .then(() => this.rebuildPortfolio(userId));
  }
}

export const logic = new Logic();
