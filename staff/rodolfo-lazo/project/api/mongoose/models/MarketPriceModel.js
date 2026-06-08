import { model } from 'mongoose'

import { marketPriceSchema } from '../schemas/index.js'

export const MarketPriceModel = model('MarketPrice', marketPriceSchema)
