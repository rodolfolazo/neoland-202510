import { PortfolioModel } from '../mongoose/index.js'
import { SystemError } from 'com'
import { PortfolioData } from './models/index.js'

export function findPortfoliosByUserId(userId) {
  return PortfolioModel.find({ userId })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((portfolioPositions) =>
      portfolioPositions.map(
        ({ id, userId, symbol, quantity }) =>
          new PortfolioData(id, userId.toString(), symbol, quantity),
      ),
    )
}
