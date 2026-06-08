import { model } from 'mongoose'
import { portfolioSchema } from '../schemas/index.js'

export const PortfolioModel = model('Portfolio', portfolioSchema)
