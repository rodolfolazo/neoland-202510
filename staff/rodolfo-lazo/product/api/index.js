//import express from 'express'
//import cors from 'cors'
const express = require("express");
const {logic} = require("./logic")
//const cors = require("cors");


const api = express();
//api.use(cors());

const jsonBodyParser = express.json()
//api.use(express.json())


const people = [
  { id: "person-0", name: "Carlo", age: 34 },
  { id: "person-1", name: "Anna", age: 36 },
  { id: "person-2", name: "Peter", age: 23 },
  { id: "person-3", name: "Annie", age:31},
  { id: "person-4", name: "Fernando", age:33}
];

api.get("/", (req, res) => res.json({ message: "Hello World", status: 200 }));

api.get("/hello", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

api.get("/people", (req, res) => {
  const personId = req.query.id;
  const person = people.find((person) => personId === person.id);
  res.json(person);
});

api.post('/users', jsonBodyParser, (req,res)=>{
  try{
    const {name, email, username, password, passwordRepeat} = req.body
    logic.registerUser(name,email,username,password,passwordRepeat)
    res.status(201)
  }catch(error){
    res.status(400).json({error: error.constructor.name, message: error.message})
  }
})

api.listen(8080, () => console.log("API listening on port 8080"));
