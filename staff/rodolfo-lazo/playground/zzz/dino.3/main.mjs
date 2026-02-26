import { Component } from './Component.mjs'

const root = document.getElementById('root')

const dino = new Component(100, 100, 'green')
dino.setX(100)
dino.setY(100)

const dinoEyeLeft = new Component(20, 20, 'white')
dinoEyeLeft.setX(20)
dinoEyeLeft.setY(20)
dino.add(dinoEyeLeft)

const dinoEyeRight = new Component(20, 20, 'white')
dinoEyeRight.setX(60)
dinoEyeRight.setY(20)
dino.add(dinoEyeRight)

const dinoArmLeft = new Component(20, 20, 'green')
dinoArmLeft.setX(-20)
dinoArmLeft.setY(40)
dino.add(dinoArmLeft)

const dinoArmRight = new Component(20, 20, 'green')
dinoArmRight.setX(100)
dinoArmRight.setY(40)
dino.add(dinoArmRight)

const dinoLegLeft = new Component(20, 20, 'green')
dinoLegLeft.setX(20)
dinoLegLeft.setY(100)
dino.add(dinoLegLeft)

const dinoLegRight = new Component(20, 20, 'green')
dinoLegRight.setX(60)
dinoLegRight.setY(100)
dino.add(dinoLegRight)

root.appendChild(dino.container)

const dino2 = new Component(100, 100, 'green')
dino2.setX(100)
dino2.setY(300)

const dino2EyeLeft = new Component(20, 20, 'white')
dino2EyeLeft.setX(20)
dino2EyeLeft.setY(20)
dino2.add(dino2EyeLeft)

const dino2EyeRight = new Component(20, 20, 'white')
dino2EyeRight.setX(60)
dino2EyeRight.setY(20)
dino2.add(dino2EyeRight)

const dino2ArmLeft = new Component(20, 20, 'green')
dino2ArmLeft.setX(-20)
dino2ArmLeft.setY(40)
dino2.add(dino2ArmLeft)

const dino2ArmRight = new Component(20, 20, 'green')
dino2ArmRight.setX(100)
dino2ArmRight.setY(40)
dino2.add(dino2ArmRight)

const dino2LegLeft = new Component(20, 20, 'green')
dino2LegLeft.setX(20)
dino2LegLeft.setY(100)
dino2.add(dino2LegLeft)

const dino2LegRight = new Component(20, 20, 'green')
dino2LegRight.setX(60)
dino2LegRight.setY(100)
dino2.add(dino2LegRight)

root.appendChild(dino2.container)