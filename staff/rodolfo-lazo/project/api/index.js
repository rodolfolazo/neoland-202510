import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import jwt from "jsonwebtoken";
import { startMarketWS, addSubscriber } from "./services/market.service.js";
import { notifyUserRegistered } from "./services/notification.service.js";

import { logic } from "./logic.js";

import {
  DuplicityError,
  ExistenceError,
  OwnershipError,
  SystemError,
  ValidationError,
  CredentialError,
  AuthError,
} from "com";

import { database } from "./models.js";

database
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");

    startMarketWS();

    const { JsonWebTokenError } = jwt;

    const api = express();

    const jsonBodyParser = express.json();

    api.use(cors());
    api.use(jsonBodyParser);

    morganBody(api, {
      logAllReqHeader: true,
      logAllResHeader: true,
    });

    api.get("/", (req, res) => res.json({ message: "Crypto API running 👌" }));

    api.post("/users", (req, res, next) => {
      try {
        const { name, email, username, password, passwordRepeat, image } =
          req.body;

        logic
          .registerUser(name, email, username, password, passwordRepeat, image)
          .then(() => {
            notifyUserRegistered({ name, email });
            res.status(201).send();
          })
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.post("/users/auth", (req, res, next) => {
      try {
        const { username, password } = req.body;

        logic
          .authenticateUser(username, password)
          .then((userId) => {
            const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET);
            res.json(token);
          })
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/users/me", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        logic
          .getUser(userId)
          .then((user) => res.json(user))
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.post("/transactions", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { symbol, type, quantity, price } = req.body;

        logic
          .addTransaction(userId, symbol, type, quantity, price)
          .then(() => res.status(201).send())
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/transactions", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        logic
          .getTransactions(userId)
          .then((transactions) => res.json(transactions))
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/transactions/:transactionId", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { transactionId } = req.params;

        logic
          .getTransaction(userId, transactionId)
          .then((transaction) => res.json(transaction))
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/transactions/symbol/:symbol", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { symbol } = req.params;

        logic
          .getTransactionsBySymbol(userId, symbol)
          .then((transactions) => res.json(transactions))
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.put("/transactions/:transactionId", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);

        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { transactionId } = req.params;

        const { symbol, type, quantity, price } = req.body;

        logic
          .updateTransaction(
            userId,
            transactionId,
            symbol,
            type,
            quantity,
            price,
          )
          .then(() => res.status(204).send())
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.delete("/transactions/:id", (req, res, next) => {
      try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) throw new AuthError();

        const { sub: userId } = jwt.verify(
          auth.slice(7),
          process.env.JWT_SECRET,
        );

        logic
          .deleteTransaction(userId, req.params.id)
          .then(() => res.status(204).send())
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/portfolios", (req, res, next) => {
      try {
        const token = req.headers.authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        logic
          .getPortfolios(userId)
          .then((portfolios) => res.json(portfolios))
          .catch(next);
      } catch (error) {
        next(error);
      }
    });

    api.get("/market/stream", (req, res) => {
      try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        const symbolsQuery = req.query.symbols;
        const symbols = symbolsQuery
          ? symbolsQuery.split(",").map((s) => s.trim().toUpperCase())
          : null;

        addSubscriber(res, symbols);

        res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

        const interval = setInterval(() => {
          res.write(`: ping\n\n`);
        }, 15000);

        res.on("close", () => {
          clearInterval(interval);
          res.end();
        });
      } catch (error) {
        res.end();
      }
    });

    api.use((error, req, res, next) => {
      let status = 500;
      let errorName = error.constructor.name;
      let { message } = error;

      if (error instanceof ValidationError) status = 400;
      else if (error instanceof DuplicityError) status = 409;
      else if (error instanceof ExistenceError) status = 404;
      else if (error instanceof CredentialError) status = 401;
      else if (error instanceof OwnershipError) status = 403;
      else if (error instanceof JsonWebTokenError) {
        status = 401;
        errorName = AuthError.name;
      } else if (
        error instanceof SyntaxError &&
        error.message.includes("token")
      ) {
        status = 401;
        errorName = AuthError.name;
        message = "invalid json payload in token";
      } else errorName = SystemError.name;

      res.status(status).json({ error: errorName, message });
    });

    api.listen(process.env.PORT, () =>
      console.log(`API listening on port ${process.env.PORT}`),
    );
  })
  .catch((error) => console.error(error));
