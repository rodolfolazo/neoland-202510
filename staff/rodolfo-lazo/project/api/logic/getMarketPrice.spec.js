import { expect } from 'chai'

import { ExistenceError } from 'com'

import { data, MarketPriceData } from '../data/index.js'
import { logic, MarketPrice } from './index.js'

describe('getMarketPrice', () => {
  const findMarketPrice = data.findMarketPrice

  afterEach(() => {
    data.findMarketPrice = findMarketPrice
  })

  it('succeeds getting the latest market price', () => {
    const lastUpdate = new Date()
    const prices = new Map([['BTCUSDT', 70000]])

    data.findMarketPrice = () =>
      Promise.resolve(
        new MarketPriceData('market-price-id', 'binance', lastUpdate, prices),
      )

    return logic.getMarketPrice().then((marketPrice) => {
      expect(marketPrice).to.be.instanceOf(MarketPrice)
      expect(marketPrice.id).to.equal('market-price-id')
      expect(marketPrice.provider).to.equal('binance')
      expect(marketPrice.lastUpdate).to.equal(lastUpdate)
      expect(marketPrice.data).to.equal(prices)
    })
  })

  it('fails when market price data does not exist', () => {
    data.findMarketPrice = () => Promise.resolve(null)

    return logic
      .getMarketPrice()
      .then(() => {
        throw new Error('expected getMarketPrice to fail')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(ExistenceError)
        expect(error.message).to.equal('market price data not found')
      })
  })
})
