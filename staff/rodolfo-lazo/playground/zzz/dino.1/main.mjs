import { Component } from "./Component.mjs";

const root = document.getElementById('root')

const dino = new Component(100,100)
dino.setX(100)
dino.setY(100)

const dinoContainer = document.createElement('div')
dinoContainer.style.width = dino.getWidth() + 'px'
dinoContainer.style.height = dino.getHeight() + 'px'
dinoContainer.style.backgroundColor = 'blue'
dinoContainer.style.position = 'absolute'
dinoContainer.style.left = dino.getX() + 'px'
dinoContainer.style.right = dino.getY() + 'px'

const dinoEye = new Component(20,20)
dinoEye.setX(10)
dinoEye.setY(20)

const dinoEyeContainer = document.createElement('div')
dinoEyeContainer.style.width = dinoEye.getWidth() + 'px'
dinoEyeContainer.style.height = dinoEye.getHeight() + 'px'
dinoEyeContainer.style.backgroundColor = 'white'
dinoEyeContainer.style.position = 'absolute'
dinoEyeContainer.style.left = dinoEye.getX() + 'px'
dinoEyeContainer.style.top = dinoEye.getY() + 'px'

dinoContainer.appendChild(dinoEyeContainer)


root.appendChild(dinoContainer)