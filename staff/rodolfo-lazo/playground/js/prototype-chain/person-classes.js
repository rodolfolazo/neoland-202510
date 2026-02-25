// TODO re-write person-constructor-functions with classes
class Person{
    constructor(name, age, gender){
        this.name = name
        this.age = age
        this.gender = gender
    }

    fart(){
        return '💨' 
    }
}

class Woman extends Person{
    constructor(name, age){
        super(name, age, 'female')
    }

    giveBirth(){
        return '👶'
    }
    
    provideOvulus(){
        return '🥚'
    }
}

class StraightWoman extends Woman{
    constructor(name, age){
        super(name, age)
    }
}

class Lesbian extends Woman{
    constructor(name, age){
        super(name, age)
    }
}

class Man extends Person{
    constructor(name, age){
        super(name, age, 'male')
    }

    provideSperm(){
        return '💦'
    }
}

class StraightMan extends Man{
    constructor(name, age){
        super(name, age)
    }
}

class Gay extends Man{
    constructor(name, age){
        super(name, age)
    }
}

//Heredará los métodos a través de inner 
class Trans {
    constructor(name, age, gender, operado){
        this.name = name
        this.age = age
        this.gender = gender
        this.operado = operado

        if (operado === 'male') {
            this.inner = new Man(name, age)
        } else if (operado === 'female') {
            this.inner = new Woman(name, age)
        } else {
            throw new Error('Operado debe ser male o female')
        }
    }
}

const pablito = new Trans("pablito", 35, "male", "female")
//console.log(pablito)
//console.log(pablito instanceof Trans)
//console.log(pablito instanceof Woman)

//Pierdo métodos de Trans pero obtengo métodos de Woman
class Trans2 {
    constructor(name, age, gender, operado){
        this.name = name
        this.age = age
        this.gender = gender
        this.operado = operado

        if (operado === 'male') {
            Object.setPrototypeOf(this, Man.prototype)
        } else if (operado === 'female') {
            Object.setPrototypeOf(this, Woman.prototype)
        } else {
            throw new Error('Operado debe ser male o female')
        }
    }
  	saludar(){
      return "Hola trans"
    }
  
}

const pablito2 = new Trans2("pablito", 35, "male", "female")

//console.log(pablito2)
//console.log(pablito2 instanceof Trans2)
//console.log(pablito2 instanceof Woman)
//console.log(pablito2.giveBirth())
console.log(pablito2.operado)
