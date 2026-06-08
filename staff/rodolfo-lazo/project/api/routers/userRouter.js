import { Router } from 'express'

import { authMiddleware } from '../middlewares/index.js'

import {
  registerUserHandler,
  authenticateUserHandler,
  getUserHandler,
} from './handlers/index.js'

export const userRouter = new Router()

userRouter.post('', registerUserHandler)
userRouter.post('/auth', authenticateUserHandler)
userRouter.get('/me', authMiddleware, getUserHandler)
