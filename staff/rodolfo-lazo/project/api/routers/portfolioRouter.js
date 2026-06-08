import { Router } from 'express'

import { authMiddleware } from '../middlewares/index.js'

import { getPortfoliosHandler } from './handlers/index.js'

export const portfolioRouter = new Router()

portfolioRouter.get('', authMiddleware, getPortfoliosHandler)
