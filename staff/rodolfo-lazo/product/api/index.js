// import express from 'express'
const express = require('express')

const api = express()

api.get('/hello', (req, res) => {
    res.send('Hello!')
})

api.listen(8080, () => console.log('API listening on port 8080'))