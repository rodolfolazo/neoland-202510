// import express from 'express'
const express = require('express')
const cors = require('cors')
require('./populate')

const { logic } = require('./logic')

const api = express()

const jsonBodyParser = express.json()

api.use(cors())

api.get('/', (req, res) => res.json({ message: 'Hello! from API ;)' }))

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, username, password, passwordRepeat } = req.body

        logic.registerUser(name, email, username, password, passwordRepeat)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        const userId = logic.authenticateUser(username, password)

        res.json(userId)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/users/email', jsonBodyParser, (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { email, newEmail, newEmailRepeat } = req.body

        logic.changeUserEmail(userId, email, newEmail, newEmailRepeat)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/users/password', jsonBodyParser, (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { password, newPassword, newPasswordRepeat } = req.body

        logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/pets', jsonBodyParser, (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { name, birthdate, weight, image } = req.body

        logic.addPet(userId, name, birthdate, weight, image)

        res.status(201).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/pets', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const pets = logic.getPets(userId)

        res.json(pets)
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.delete('/pets/:petId', (req, res) => {
    try {
        const userId = req.headers.authorization.slice(6)

        const { petId } = req.params

        logic.removePet(userId, petId)

        res.status(204).send()
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('API listening on port 8080'))