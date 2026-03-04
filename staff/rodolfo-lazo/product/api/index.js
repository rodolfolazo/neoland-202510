import express from 'express'
import cors from 'cors'
import morganBody from 'morgan-body'
import jwt from 'jsonwebtoken'

import './populate.js'

import { logic } from './logic.js'
import { DuplicityError, ExistenceError, OwnershipError, SystemError, ValidationError, CredentialError, AuthError } from './errors.js'

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

        res.status(201).send()
    } catch (error) {
        next(error)
    }
})

api.post('/users/auth', (req, res, next) => {
    try {
        const { username, password } = req.body

        const userId = logic.authenticateUser(username, password)

        const token = jwt.sign({ sub: userId }, JWT_SECRET)

        res.json(token)
    } catch (error) {
        next(error)
    }
})

api.patch('/users/me/email', (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { email, newEmail, newEmailRepeat } = req.body

        logic.changeUserEmail(userId, email, newEmail, newEmailRepeat)

        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

api.patch('/users/me/password', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { password, newPassword, newPasswordRepeat } = req.body

        logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/me', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const user = logic.getUser(userId)

        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/users/me/image', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { image } = req.body

        logic.changeUserImage(userId, image)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/pets', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { name, birthdate, weight, image } = req.body

        logic.addPet(userId, name, birthdate, weight, image)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/pets', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const pets = logic.getPets(userId)

        res.json(pets)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.delete('/pets/:petId', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { petId } = req.params

        logic.removePet(userId, petId)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/pets/:petId', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { petId } = req.params

        const pet = logic.getPet(userId, petId)

        res.json(pet)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.put('/pets/:petId', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7) // Bearer eyJ...

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        const { petId } = req.params

        const { name, birthdate, weight, image } = req.body

        logic.modifyPet(userId, petId, name, birthdate, weight, image)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.use((error, req, res, next) => {
    let status = 500
    let errorName = error.constructor.name

    const { message } = error

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
    } else
        errorName = SystemError.name

    res.status(status).json({ error: errorName, message })
})

api.listen(8080, () => console.log('API listening on port 8080'))