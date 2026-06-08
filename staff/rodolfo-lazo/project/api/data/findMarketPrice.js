import { SystemError } from 'com'
import { MarketPriceModel } from '../mongoose/index.js'
import { MarketPriceData } from './models/index.js'

export function findMarketPrice() {
  return MarketPriceModel.findOne()
    .sort({ lastUpdate: -1 })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((marketPriceModel) => {
      if (!marketPriceModel) return null

      const { id, provider, lastUpdate, data } = marketPriceModel

      return new MarketPriceData(id, provider, lastUpdate, data)
    })
}
