import { Component } from './Component.mjs'

const root = document.getElementById('root')

const dino = new Component(100, 100, 'green')
dino.setX(100)
dino.setY(100)

const dinoEye = new Component(20, 20, 'white')
dinoEye.setX(20)
dinoEye.setY(20)

//dino.container.appendChild(dinoEye.container)
dino.add(dinoEye)

root.appendChild(dino.container)
