import { SystemError, ValidationError } from "com";
import { UserModel, PortfolioModel, TransactionModel } from "./models.js";

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

  getPreviousTransaction(userId, symbol, executedAt) {
    return TransactionModel.findOne({
      userId,
      symbol,
      executedAt: { $lt: executedAt },
    })
      .sort({ executedAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      });
  }

  getNextTransactions(userId, symbol, executedAt) {
    return TransactionModel.find({
      userId,
      symbol,
      executedAt: { $gte: executedAt },
    })
      .sort({ executedAt: 1 })
      .catch((error) => {
        throw new SystemError(error.message);
      });
  }

  updateBalanceChain(userId, symbol, startExecutedAt) {
    let previousBalance = 0;

    return this.getPreviousTransaction(userId, symbol, startExecutedAt)
      .then((prev) => {
        if (prev) previousBalance = prev.balanceAfter;
        return this.getNextTransactions(userId, symbol, startExecutedAt);
      })
      .then((txs) => {
        let chain = Promise.resolve();
        let balance = previousBalance;

        txs.forEach((tx) => {
          chain = chain.then(() => {
            const delta = tx.type === "BUY" ? tx.quantity : -tx.quantity;

            if (tx.type === "SELL" && -delta > balance)
              throw new ValidationError(
                "not enough balance at this point in history",
              );

            balance += delta;

            return TransactionModel.updateOne(
              { _id: tx.id },
              { $set: { balanceAfter: balance } },
            ).catch((error) => {
              throw new SystemError(error.message);
            });
          });
        });

        return chain;
      });
  }

  findTransactionById(transactionId) {
    return TransactionModel.findById(transactionId)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionModel) => {
        if (!transactionModel) return null;
        const { id, userId, symbol, type, quantity, price, value, executedAt } =
          transactionModel;
        return new TransactionData(
          id,
          userId.toString(),
          symbol,
          type,
          quantity,
          price,
          value,
          executedAt,
        );
      });
  }

  findTransactionsByUserId(userId) {
    return TransactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionDatas) =>
        transactionDatas.map(
          ({ id, userId, symbol, type, quantity, price, value, executedAt }) =>
            new TransactionData(
              id,
              userId.toString(),
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

  findTransactionsBySymbol(userId, symbol) {
    return TransactionModel.find({ userId, symbol })
      .sort({ createdAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((transactionDatas) =>
        transactionDatas.map(
          ({ id, userId, symbol, type, quantity, price, value, executedAt }) =>
            new TransactionData(
              id,
              userId.toString(),
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

  insertTransaction(transactionData) {
    const { userId, symbol, type, quantity, executedAt } = transactionData;

    let balanceBefore = 0;

    return this.getPreviousTransaction(userId, symbol, executedAt)
      .then((prev) => {
        if (prev) balanceBefore = prev.balanceAfter;

        if (type === "SELL" && quantity > balanceBefore)
          throw new ValidationError(
            "not enough balance at this point in history",
          );

        const delta = type === "BUY" ? quantity : -quantity;
        const balanceAfter = balanceBefore + delta;

        const txModel = new TransactionModel({
          ...transactionData,
          balanceAfter,
        });

        return txModel.save().catch((error) => {
          throw new SystemError(error.message);
        });
      })
      .then(() => this.updateBalanceChain(userId, symbol, executedAt))
      .then(() => {});
  }

  updateTransaction(transactionData) {
    return TransactionModel.findById(transactionData.id)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((original) => {
        if (!original) return;

        return TransactionModel.updateOne(
          { _id: transactionData.id },
          { $set: transactionData },
        )
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then(() =>
            this.updateBalanceChain(
              transactionData.userId,
              transactionData.symbol,
              transactionData.executedAt,
            ),
          );
      })
      .then(() => {});
  }

  deleteTransaction(transactionId) {
    let deletedTx = null;

    return TransactionModel.findById(transactionId)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((tx) => {
        if (!tx) return null;
        deletedTx = tx;

        return TransactionModel.deleteOne({ _id: transactionId }).catch(
          (error) => {
            throw new SystemError(error.message);
          },
        );
      })
      .then(() => {
        if (!deletedTx) return;
        return this.updateBalanceChain(
          deletedTx.userId,
          deletedTx.symbol,
          deletedTx.executedAt,
        );
      })
      .then(() => {});
  }

  deleteAllTransactions() {
    return TransactionModel.deleteMany()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  deleteAllPortfolios() {
    return PortfolioModel.deleteMany()
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
      .then((portfolioModel) =>
        portfolioModel.map(
          ({ id, userId, symbol, quantity }) =>
            new PortfolioData(id, userId.toString(), symbol, quantity),
        ),
      );
  }

  findPortfolio(userId, symbol) {
    return PortfolioModel.findOne({ userId, symbol })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((portfolioModel) => {
        if (!portfolioModel) return null;

        const { id, userId, symbol, quantity } = portfolioModel;

        return new PortfolioData(id, userId.toString(), symbol, quantity);
      });
  }

  rebuildPortfolio(userId) {
    return TransactionModel.find({ userId })
      .sort({ executedAt: 1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((txs) =>
        PortfolioModel.deleteMany({ userId })
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then(() => txs),
      )
      .then((txs) => {
        let chain = Promise.resolve();

        txs.forEach((tx) => {
          const delta = tx.type === "BUY" ? tx.quantity : -tx.quantity;

          chain = chain.then(() =>
            PortfolioModel.updateOne(
              { userId, symbol: tx.symbol },
              { $inc: { quantity: delta } },
              { upsert: true },
            ).catch((error) => {
              throw new SystemError(error.message);
            }),
          );
        });

        return chain;
      })
      .then(() =>
        PortfolioModel.deleteMany({ userId, quantity: { $lte: 0 } }).catch(
          (error) => {
            throw new SystemError(error.message);
          },
        ),
      )
      .then(() => {});
  }

  deleteAllPortfolios() {
    return PortfolioModel.deleteMany()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }
}

export const data = new Data();
