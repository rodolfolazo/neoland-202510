import { validate, ExistenceError } from "com";
import { data } from "../data/index.js";
import { Portfolio } from "./models/Portfolio.js";

export function getPortfolios(userId) {
  validate.id(userId, "userId");

  return data
    .findUserById(userId)
    .then((user) => {
      if (!user) throw new ExistenceError("user not found");

      return data.findPortfoliosByUserId(userId);
    })
    .then((portfoliosData) =>
      portfoliosData.map(
        ({ id, userId, symbol, quantity }) =>
          new Portfolio(id, userId, symbol, quantity),
      ),
    );
}
