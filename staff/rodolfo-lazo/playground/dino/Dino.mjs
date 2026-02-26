import { Component } from './Component.mjs'

export class Dino extends Component {
    constructor() {
        super(100, 100, 'green')

        const eyeLeft = new Component(20, 20, 'white')
        eyeLeft.setX(20)
        eyeLeft.setY(20)
        this.add(eyeLeft)
        
        const eyeRight = new Component(20, 20, 'white')
        eyeRight.setX(60)
        eyeRight.setY(20)
        this.add(eyeRight)
        
        const armLeft = new Component(20, 20, 'green')
        armLeft.setX(-20)
        armLeft.setY(40)
        this.add(armLeft)
        
        const armRight = new Component(20, 20, 'green')
        armRight.setX(100)
        armRight.setY(40)
        this.add(armRight)
        
        const legLeft = new Component(20, 20, 'green')
        legLeft.setX(20)
        legLeft.setY(100)
        this.add(legLeft)
        
        const legRight = new Component(20, 20, 'green')
        legRight.setX(60)
        legRight.setY(100)
        this.add(legRight)
    }
}