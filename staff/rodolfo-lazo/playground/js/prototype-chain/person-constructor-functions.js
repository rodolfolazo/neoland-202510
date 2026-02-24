function Person(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
}

Person.prototype.fart = function() {
    return '💨'
}

//var peter = new Person('Peter', 23, 'male')
//var wendy = new Person('Wendy', 22, 'female')
//var campa = new Person('Campa', 18, 'female')
//var pepito = new Person('Pepito', 40, 'male')

function Woman(name, age) {
    Person.call(this, name, age, 'female')
}

Woman.prototype = Object.create(Person.prototype)
Woman.prototype.constructor = Woman

Woman.prototype.giveBirth = function() {
    return '👶'
}

function StraightWoman(name, age) {
    Woman.call(this, name, age)
}

StraightWoman.prototype = Object.create(Woman.prototype)
StraightWoman.prototype.constructor = StraightWoman

function Lesbian(name, age) {
    Woman.call(this, name, age)
}

Lesbian.prototype = Object.create(Woman.prototype)
Lesbian.prototype.constructor = Lesbian

Woman.prototype.provideOvulus = function() {
    return '🥚'
}

function Man(name, age) {
    Person.call(this, name, age, 'male')
}

Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man

Man.prototype.provideSperm = function() {
    return '💦'
}

function StraightMan(name, age) {
    Man.call(this, name, age)
}

StraightMan.prototype = Object.create(Man.prototype)
StraightMan.prototype.constructor = StraightMan

function Gay(name, age) {
    Man.call(this, name, age)
}

Gay.prototype = Object.create(Man.prototype)
Gay.prototype.constructor = Gay

function Trans(name, age, gender, operated) {
    Person.call(this, name, age, gender)
    this.operated = operated

    if (gender === 'female' && !operated)
        this.provideOvulus = Woman.prototype.provideOvulus
    else if (gender === 'male' && !operated)
        this.provideSperm = Man.prototype.provideSperm
}

Trans.prototype = Object.create(Person.prototype)
Trans.prototype.constructor = Trans

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

/*
Object
 |_ Person
     |_ Woman
     |   |_ StraightWoman
     |   |_ Lesbian
     |_ Man
     |   |_ StraightMan
     |   |_ Gay
     |_ Trans    
*/
