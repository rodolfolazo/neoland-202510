import bcrypt from "bcryptjs";

import {
  database,
  UserModel,
  PortfolioModel,
  TransactionModel,
} from "./models.js";

database
  .connect("mongodb://localhost:27017/crypto")
  .then(() => bcrypt.hash("123123123", 10))
  .then((hash) => {
    const piotr = new UserModel({
      name: "Piotr Kurshinksky",
      email: "piotr@mail.com",
      username: "mrpiotr",
      password: hash,
    });
    const rafal = new UserModel({
      name: "Rafal Oljenik",
      email: "mrrafal@mail.com",
      username: "mrrafal",
      password: hash,
    });

    return Promise.all([piotr.save(), rafal.save()])
      .then(([piotr, rafal]) => {
        console.log(piotr, rafal);

        const transaction1 = new TransactionModel({
          userId: piotr.id,
          symbol: "BTCUSDT",
          type: "BUY",
          quantity: 0.1,
          price: 70000,
          value: 70000 * 0.1,
          executedAt: new Date(),
        });

        const transaction2 = new TransactionModel({
          userId: piotr.id,
          symbol: "ETHUSDT",
          type: "BUY",
          quantity: 0.2,
          price: 2300,
          value: 2300 * 0.2,
          executedAt: new Date(),
        });

        const transaction3 = new TransactionModel({
          userId: piotr.id,
          symbol: "BTCUSDT",
          type: "BUY",
          quantity: 0.4,
          price: 72000,
          value: 72000 * 0.4,
          executedAt: new Date(),
        });

        const transaction4 = new TransactionModel({
          userId: piotr.id,
          symbol: "BTCUSDT",
          type: "SELL",
          quantity: 0.2,
          price: 74000,
          value: 74000 * 0.2,
          executedAt: new Date(),
        });

        const transaction5 = new TransactionModel({
          userId: rafal.id,
          symbol: "XRPUSDT",
          type: "BUY",
          quantity: 100,
          price: 2,
          value: 2 * 100,
          executedAt: new Date(),
        });

        const transaction6 = new TransactionModel({
          userId: rafal.id,
          symbol: "XRPUSDT",
          type: "BUY",
          quantity: 400,
          price: 2,
          value: 2 * 400,
          executedAt: new Date(),
        });

        const transaction7 = new TransactionModel({
          userId: rafal.id,
          symbol: "XLMUSDT",
          type: "BUY",
          quantity: 800,
          price: 0.5,
          value: 0.5 * 800,
          executedAt: new Date(),
        });

        const transaction8 = new TransactionModel({
          userId: rafal.id,
          symbol: "XLMUSDT",
          type: "SELL",
          quantity: 300,
          price: 0.6,
          value: 0.6 * 300,
          executedAt: new Date(),
        });

        return Promise.all([
          transaction1.save(),
          transaction2.save(),
          transaction3.save(),
          transaction4.save(),
          transaction5.save(),
          transaction6.save(),
          transaction7.save(),
          transaction8.save(),
        ]);
      })
      .then(
        ([
          transaction1,
          transaction2,
          transaction3,
          transaction4,
          transaction5,
          transaction6,
          transaction7,
          transaction8,
        ]) =>
          console.log(
            transaction1,
            transaction2,
            transaction3,
            transaction4,
            transaction5,
            transaction6,
            transaction7,
            transaction8,
          ),
      );
  })
  .catch((error) => console.error(error))
  .finally(() => database.disconnect());
