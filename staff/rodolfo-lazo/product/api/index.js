//import express from 'express'
//import cors from 'cors'
const express = require("express");
const { logic } = require("./logic");
//const cors = require("cors");

const api = express();
//api.use(cors());

const jsonBodyParser = express.json();
//api.use(express.json())

const people = [
  { id: "person-0", name: "Carlo", age: 34 },
  { id: "person-1", name: "Anna", age: 36 },
  { id: "person-2", name: "Peter", age: 23 },
  { id: "person-3", name: "Annie", age: 31 },
  { id: "person-4", name: "Fernando", age: 33 },
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

//Register user
api.post("/users", jsonBodyParser, (req, res) => {
  try {
    const { name, email, username, password, passwordRepeat } = req.body;
    logic.registerUser(name, email, username, password, passwordRepeat);
    res.status(201).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Authenticate user
api.post("/users/auth", jsonBodyParser, (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = logic.authenticateUser(username, password);
    res.send(userId);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Add Pet
api.post("/pets", jsonBodyParser, (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);
    const { name, birthdate, weight, image } = req.body;
    logic.addPet(userId, name, birthdate, weight, image);
    res.status(201).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Get pet list
api.get("/pets", (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);
    const pets = logic.getPets(userId);
    res.status(200).json(pets);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Delete pet
api.delete("/pets/:petId", (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);
    const { petId } = req.params;

    logic.removePet(userId, petId);
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Update user email
api.patch("/users/email", jsonBodyParser, (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);

    const { email, newEmail, newEmailRepeat } = req.body;

    logic.changeUserEmail(userId, email, newEmail, newEmailRepeat);

    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Update user password
api.patch("/users/password", jsonBodyParser, (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);

    const { password, newPassword, newPasswordRepeat } = req.body;

    logic.changeUserPassword(userId, password, newPassword, newPasswordRepeat);

    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Update pet
api.put("/pets/:petId", jsonBodyParser, (req, res) => {
  try {
    const userId = req.headers.authorization.slice(6);
    const { name, birthdate, weight, image } = req.body;
    const { petId } = req.params;
    logic.updatePet(userId, petId, name, birthdate, weight, image);
    res.status(204).send();
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//Update username
//Update name

api.listen(8080, () => console.log("API listening on port 8080"));
