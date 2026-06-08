import { getPrices } from '../../services/priceService.js'

export function getPricesHandler(req, res, next) {
  try {
    const { userId } = req

    getPrices(userId)
      .then(({ data, lastUpdate }) => res.json({ data, lastUpdate }))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
