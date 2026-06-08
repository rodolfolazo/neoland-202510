import express, { Router } from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'

import {
  userRouter,
  transactionRouter,
  portfolioRouter,
  priceRouter,
} from './routers/index.js'

import { errorHandler } from './middlewares/errorHandler.js'

import { connect } from './mongoose/index.js'

import { jobs } from './jobs/index.js'

connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connected')

    const api = express()
    const jsonBodyParser = express.json()

    api.use(cors())
    api.use(jsonBodyParser)

    morganBody(api, {
      logAllReqHeader: true,
      logAllResHeader: true,
    })

    jobs.startPriceUpdater()

    api.get('/', (req, res) => res.json({ message: 'Hello! from API ;)' }))

    api.use('/users', userRouter)
    api.use('/transactions', transactionRouter)
    api.use('/portfolios', portfolioRouter)
    api.use('/prices', priceRouter)

    api.use(errorHandler)

    api.listen(process.env.PORT, () =>
      console.log(`API listening on port ${process.env.PORT}`),
    )
  })
  .catch((error) => console.error(error))
