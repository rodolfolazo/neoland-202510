import { logic } from '../../logic/index.js'

export function getMarketPriceHandler(req, res, next) {
  try {
    logic
      .getMarketPrice()
      .then((marketprice) => res.json(marketprice))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
