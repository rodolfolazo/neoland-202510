import { PortfolioModel } from "../mongoose/index.js";
import { SystemError } from "com";

export function replacePortfolio(userId, portfolioPositions) {
  return PortfolioModel.deleteMany({ userId })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {
      if (!portfolioPositions.length) return;

      return PortfolioModel.insertMany(portfolioPositions).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
}
