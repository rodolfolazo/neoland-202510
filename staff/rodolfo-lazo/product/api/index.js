// import express from 'express'
const express = require('express')

const api = express()

const people = [
  { id: 'person-0', name: 'Carlo', age:34},
  { id: 'person-1', name: 'Anna', age:36},
  { id: 'person-2', name: 'Peter', age:23}
]

api.get('/', (req, res) => res.json({message: 'Hello World', status:200}))

api.get('/hello', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

api.get('/people', (req, res) =>{
  const personId = req.query.id
  const person = people.find( person => personId === person.id)
  res.json(person)
})

api.listen(8080, () => console.log('API listening on port 8080'))

