import { MarketPriceModel } from '../mongoose/index.js'

import { SystemError } from 'com'

export function insertMarketPrice(marketPriceData) {
  const marketPriceModel = new MarketPriceModel(marketPriceData)

  return marketPriceModel
    .save()
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(() => {})
}
