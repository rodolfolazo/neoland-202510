import { logic } from "../../logic/index.js";

export function getPortfoliosHandler(req, res, next) {
  try {
    const { userId } = req;

    logic
      .getPortfolios(userId)
      .then((portfolios) => res.json(portfolios))
      .catch(next);
  } catch (error) {
    next(error);
  }
}
