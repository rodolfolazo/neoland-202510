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

  addTransaction(userId, symbol, type, quantity, price) {
    validate.id(userId, "userId");
    validate.ticker(symbol, "symbol");
    validate.type(type, "type");
    validate.number(quantity, "quantity");
    validate.number(price, "price");

    if (!["BUY", "SELL"].includes(type))
      throw new ValidationError("invalid transaction type");

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");

        return data.findPortfolio(userId, symbol);
      })
      .then((portfolioData) => {
        if (type === "SELL") {
          const currentQuantity = portfolioData ? portfolioData.quantity : 0;

          if (quantity > currentQuantity)
            throw new ValidationError("not enough balance");
        }

        const value = quantity * price;

        const transactionData = new TransactionData(
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
          .insertTransaction(transactionData)
          .then(() => {
            const change = type === "BUY" ? quantity : -quantity;

            return data.updatePortfolio(userId, symbol, change);
          })
          .then(() => {
            return data.deletePortfolioIfZero(userId, symbol);
          });
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

  getTransactionsBySymbol(userId, symbol) {
    validate.id(userId, "userId");
    validate.ticker(symbol, "symbol");

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");

        return data.findTransactionsBySymbol(userId, symbol);
      })
      .then((transactionDatas) => {
        return transactionDatas.map(
          ({ id, symbol, type, quantity, price, value, executedAt }) =>
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
        );
      });
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
      .then((transactionData) => {
        if (!transactionData) throw new ExistenceError("transaction not found");
        if (transactionData.userId !== userId)
          throw new OwnershipError("user not owner of transaction");

        const { id, symbol, type, quantity, price, value, executedAt } =
          transactionData;

        return new Transaction(
          id,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
        );
      });
  }

  updateTransaction(userId, transactionId, symbol, type, quantity, price) {
    validate.id(userId);
    validate.id(transactionId);

    return data
      .findUserById(userId)
      .then((userData) => {
        if (!userData) throw new ExistenceError("user not found");

        return data.findTransactionById(transactionId);
      })
      .then((transactionData) => {
        if (!transactionData) throw new ExistenceError("transaction not found");
        if (transactionData.userId !== userId)
          throw new OwnershipError("user not owner of transaction");

        const value = quantity * price;

        return data.updateTransaction(
          new TransactionData(
            transactionId,
            userId,
            symbol,
            type,
            quantity,
            price,
            value,
            new Date(),
          ),
        );
      })
      .then(() => this.rebuildPortfolio(userId));
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
      .then((transactionData) => {
        if (!transactionData) throw new ExistenceError("transaction not found");
        if (transactionData.userId !== userId)
          throw new OwnershipError("user not owner of transaction");
        return data.deleteTransaction(transactionId);
      })
      .then(() => this.rebuildPortfolio(userId));
  }

  getPortfolios(userId) {
    validate.id(userId, "userId");

    return data
      .findUserById(userId)
      .then((user) => {
        if (!user) throw new ExistenceError("user not found");

        return data.findPortfoliosByUserId(userId);
      })
      .then((portfolioDatas) =>
        portfolioDatas.map(
          ({ id, userId, symbol, quantity }) =>
            new Portfolio(id, userId, symbol, quantity),
        ),
      );
  }

  rebuildPortfolio(userId) {
    return data
      .findTransactionsByUserId(userId)
      .then((transactionDatas) => {
        return data
          .deletePortfolioByUserId(userId)
          .then(() => transactionDatas);
      })
      .then((transactionDatas) => {
        const ops = [];
        for (const transactionData of transactionDatas) {
          const change =
            transactionData.type === "BUY"
              ? transactionData.quantity
              : -transactionData.quantity;
          ops.push(
            data.updatePortfolio(userId, transactionData.symbol, change),
          );
        }
        return Promise.all(ops);
      });
  }
}

export const logic = new Logic();
