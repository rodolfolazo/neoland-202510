import { SystemError } from "com";

import {
  UserModel,
  PortfolioModel,
  TransactionModel,
} from "./mongoose/index.js";

export class UserData {
  constructor(id, name, email, username, password, image, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.image = image;
    this.role = role;
  }
}

export class PortfolioData {
  constructor(id, userId, symbol, quantity) {
    this.id = id;
    this.userId = userId;
    this.symbol = symbol;
    this.quantity = quantity;
  }
}

export class TransactionData {
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

class Data {
  insertUser(userData) {
    const userModel = new UserModel(userData);

    return userModel
      .save()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  findUserByEmail(email) {
    return UserModel.findOne({ email })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((userModel) => {
        if (!userModel) return null;

        const { id, name, email, username, password, image, role } = userModel;

        return new UserData(id, name, email, username, password, image, role);
      });
  }

  findUserByUsername(username) {
    return UserModel.findOne({ username })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((userModel) => {
        if (!userModel) return null;

        const { id, name, email, username, password, image, role } = userModel;

        return new UserData(id, name, email, username, password, image, role);
      });
  }

  findUserById(userId) {
    return UserModel.findById(userId)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((userModel) => {
        if (!userModel) return null;

        const { id, name, email, username, password, image, role } = userModel;

        return new UserData(id, name, email, username, password, image, role);
      });
  }

  updateUser(userData) {
    return UserModel.updateOne({ _id: userData.id }, { $set: userData })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  deleteAllUsers() {
    return UserModel.deleteMany({})
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  findTransactionById(transactionId) {
    return TransactionModel.findById(transactionId)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModel) => {
        if (!transactionModel) return null;

        const {
          id,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        } = transactionModel;

        return new TransactionData(
          id,
          userId.toString(),
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

  findTransactionsByUserId(userId) {
    return TransactionModel.find({ userId })
      .sort({ executedAt: -1, createdAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModels) =>
        transactionModels.map(
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
            new TransactionData(
              id,
              userId.toString(),
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

  findTransactionsBySymbol(userId, symbol) {
    return TransactionModel.find({ userId, symbol })
      .sort({ executedAt: -1, createdAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModels) =>
        transactionModels.map(
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
            new TransactionData(
              id,
              userId.toString(),
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

  findPreviousTransaction(userId, symbol, executedAt) {
    return TransactionModel.findOne({
      userId,
      symbol,
      executedAt: { $lt: executedAt },
    })
      .sort({ executedAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModel) => {
        if (!transactionModel) return null;

        const {
          id,
          userId,
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
          balanceAfter,
        } = transactionModel;

        return new TransactionData(
          id,
          userId.toString(),
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

  findTransactionsFromDate(userId, symbol, executedAt) {
    return TransactionModel.find({
      userId,
      symbol,
      executedAt: { $gte: executedAt },
    })
      .sort({ executedAt: 1, createdAt: 1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModels) =>
        transactionModels.map(
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
            new TransactionData(
              id,
              userId.toString(),
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

  insertTransaction(transactionData) {
    const transactionModel = new TransactionModel(transactionData);

    return transactionModel
      .save()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  updateTransaction(transactionData) {
    return TransactionModel.updateOne(
      { _id: transactionData.id },
      { $set: transactionData },
    )
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  deleteTransaction(transactionId) {
    return TransactionModel.deleteOne({ _id: transactionId })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  deleteAllTransactions() {
    return TransactionModel.deleteMany({})
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  findPortfoliosByUserId(userId) {
    return PortfolioModel.find({ userId })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((portfolioPositions) =>
        portfolioPositions.map(
          ({ id, userId, symbol, quantity }) =>
            new PortfolioData(id, userId.toString(), symbol, quantity),
        ),
      );
  }

  replacePortfolio(userId, portfolioPositions) {
    return PortfolioModel.deleteMany({ userId })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {
        if (!portfolioPositions.length) return;

        return PortfolioModel.insertMany(portfolioPositions)
        .catch((error) => {
          throw new SystemError(error.message);
        });
      })
      .then(() => {});
  }

  deleteAllPortfolios() {
    return PortfolioModel.deleteMany({})
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }
}

export const data = new Data();
