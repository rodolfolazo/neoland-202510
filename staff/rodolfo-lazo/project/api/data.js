import { SystemError } from "com";
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

  findPortfolioByUserId(userId) {
    return PortfolioModel.find({ userId })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((models) =>
        models.map(
          ({ id, userId, symbol, quantity }) =>
            new PortfolioData(id, userId.toString(), symbol, quantity),
        ),
      );
  }

  findPortfolioItem(userId, symbol) {
    return PortfolioModel.findOne({ userId, symbol })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((model) => {
        if (!model) return null;

        const { id, userId, symbol, quantity } = model;

        return new PortfolioData(id, userId.toString(), symbol, quantity);
      });
  }

  updatePortfolio(userId, symbol, quantityChange) {
    return PortfolioModel.updateOne(
      { userId, symbol },
      { $inc: { quantity: quantityChange } },
      { upsert: true },
    )
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  deletePortfolioIfZero(userId, symbol) {
    return PortfolioModel.deleteOne({
      userId,
      symbol,
      quantity: { $lte: 0 },
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  insertTransaction(transactionData) {
    const { userId, symbol, type, quantity, price, value, executedAt } =
      transactionData;

    const transactionModel = new TransactionModel({
      userId,
      symbol,
      type,
      quantity,
      price,
      value,
      executedAt,
    });

    return transactionModel
      .save()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  }

  findTransactionsByUserId(userId) {
    return TransactionModel.find({ userId })
      .sort({ createdAt: -1 })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((models) =>
        models.map(
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

  deletePortfolioByUserId(userId) {
    return PortfolioModel.deleteMany({ userId }).catch((error) => {
      throw new SystemError(error.message);
    });
  }

  upsertPortfolio(userId, symbol, quantity) {
    return PortfolioModel.updateOne(
      { userId, symbol },
      { $inc: { quantity } },
      { upsert: true },
    ).catch((error) => {
      throw new SystemError(error.message);
    });
  }

  updateTransaction(transactionId, updates) {
    return TransactionModel.findByIdAndUpdate(
      transactionId,
      { $set: updates },
      { new: true },
    ).catch((error) => {
      throw new SystemError(error.message);
    });
  }

  deleteTransaction(transactionId) {
    return TransactionModel.findByIdAndDelete(transactionId).catch((error) => {
      throw new SystemError(error.message);
    });
  }
}

export const data = new Data();
