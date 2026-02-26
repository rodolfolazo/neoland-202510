class Person {
    constructor(name, age, gender) {
        this.name = name
        this.age = age
        this.gender = gender
    }
    fart() {
        return '💨'
    }
}

class Trans extends Person {
    constructor(name, age, gender, operated) {
        super(name, age, gender)
        this.operated = operated
        if (gender === 'female' && !operated)
            this.provideOvulus = Woman.prototype.provideOvulus
        else if (gender === 'male' && !operated)
            this.provideSperm = Man.prototype.provideSperm
    }
}

class Woman extends Person {
    constructor(name, age) {
        super(name, age, 'female')
    }
    giveBirth() {
        return '👶'
    }
    provideOvulus() {
        return '🥚'
    }
}

class StraightWoman extends Woman {
    constructor(name, age) {
        super(name, age)
    }
}

class Lesbian extends Woman {
    constructor(name, age) {
        super(name, age)
    }
}

class Man extends Person {
    constructor(name, age) {
        super(name, age, 'male')
    }
    provideSperm() {
        return '💦'
    }
}

class StraightMan extends Man {
    constructor(name, age) {
        super(name, age)
    }
}

class Gay extends Man {
    constructor(name, age) {
        super(name, age)
    }
}

var wendy = new StraightWoman('Wendy', 22)
var peter = new Man('Peter', 23)
var petra = new Trans('Petra', 23, 'male', true)
var wendu = new Trans('Wendy', 22, 'female', false)
var campa = new Lesbian('Campa', 19)
var pepito = new Gay('Pepito', 40)

console.log('wendy')
console.log('is woman', wendy instanceof Woman) // true
console.log('is man', wendy instanceof Man) // false
console.log('is person', wendy instanceof Person) // true

console.log('peter')
console.log('is woman', peter instanceof Woman) // false
console.log('is man', peter instanceof Man) // true
console.log('is person', peter instanceof Person) // true

console.log('petra')
console.log('is woman', petra instanceof Woman) // false
console.log('is man', petra instanceof Man) // false
console.log('is person', petra instanceof Person) // true
console.log('is trans', petra instanceof Trans) // true

console.log('wendu')
console.log('is woman', wendu instanceof Woman) // false
console.log('is man', wendu instanceof Man) // false
console.log('is person', wendu instanceof Person) // true
console.log('is trans', wendu instanceof Trans) // true