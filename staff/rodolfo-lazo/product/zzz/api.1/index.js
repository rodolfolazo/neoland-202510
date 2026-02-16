// import express from 'express'
const express = require('express')

const api = express()

const jsonBodyParser = express.json()

const people = [
    { id: 'person-0', name: 'Carlo', age: 34 },
    { id: 'person-1', name: 'Anna', age: 36 },
    { id: 'person-2', name: 'Peter', age: 23 },
]

api.get('/', (req, res) => res.json({ message: 'Hello! from API ;)'}))

// http://localhost:8080/people?id=person-0
api.get('/people', (req, res) =>{
    const personId = req.query.id

    const person = people.find(person => person.id === personId)

    res.json(person)
})

api.post('/people', jsonBodyParser, (req, res) => {
    const person = req.body

    people.push(person)

    res.send()
})

api.listen(8080, () => console.log('API listening on port 8080'))