import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import jwt from 'jsonwebtoken'

import { logic } from './logic.js'
import { DuplicityError, ExistenceError, OwnershipError, SystemError, ValidationError, CredentialError, AuthError } from './errors.js'

import { database } from './models.js'

database.connect('mongodb://localhost:27017/product')
    .then(() => {
        console.log('DB connected')

        const { JsonWebTokenError } = jwt

        const JWT_SECRET = 'a superman le puede la criptonita'

        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        api.use(jsonBodyParser)

        morganBody(api, {
            logAllReqHeader: true,
            logAllResHeader: true
        })


        api.get('/', (req, res) => res.json({ message: 'Hello! from API ;)' }))

        api.post('/users', (req, res, next) => {
            try {
                const { name, email, username, password, passwordRepeat } = req.body

                logic.registerUser(name, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.post('/users/auth', (req, res, next) => {
            try {
                const { username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })

                        res.json(token)
                    })
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/users/me/email', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { email, newEmail, newEmailRepeat } = req.body

                logic.changeUserEmail(userId, email, newEmail, newEmailRepeat)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/users/me/password', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { password, newPassword, newPasswordRepeat } = req.body

                logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat)

                res.status(204).send()
            } catch (error) {
                next(error)
            }
        })

        api.get('/users/me', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getUser(userId)
                    .then(user => res.json(user))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/users/me/image', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { image } = req.body

                logic.changeUserImage(userId, image)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/users/me/name', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { name } = req.body

                logic.changeUserName(userId, name)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/users/me/username', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { username } = req.body

                logic.changeUserUsername(userId, username)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.post('/pets', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { name, birthdate, weight, image } = req.body

                logic.addPet(userId, name, birthdate, weight, image)
                    .then(() => res.status(201).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.get('/pets', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getPets(userId)
                    .then(pets => res.json(pets))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.delete('/pets/:petId', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { petId } = req.params

                logic.removePet(userId, petId)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.get('/pets/:petId', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { petId } = req.params

                logic.getPet(userId, petId)
                    .then(pet => res.json(pet))
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.put('/pets/:petId', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { petId } = req.params

                const { name, birthdate, weight, image } = req.body

                logic.modifyPet(userId, petId, name, birthdate, weight, image)
                    .then(() => res.status(204).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.use((error, req, res, next) => {
            let status = 500
            let errorName = error.constructor.name

            let { message } = error

            if (error instanceof ValidationError)
                status = 400
            else if (error instanceof DuplicityError)
                status = 409
            else if (error instanceof ExistenceError)
                status = 404
            else if (error instanceof CredentialError)
                status = 401
            else if (error instanceof OwnershipError)
                status = 403
            else if (error instanceof JsonWebTokenError) {
                status = 401
                errorName = AuthError.name
            } else if (error instanceof SyntaxError && error.message.includes('token')) {
                status = 401
                errorName = AuthError.name
                message = 'invalid json payload in token'
            } else
                errorName = SystemError.name

            res.status(status).json({ error: errorName, message })
        })

        api.listen(8080, () => console.log('API listening on port 8080'))
    })
    .catch(error => console.error(error))