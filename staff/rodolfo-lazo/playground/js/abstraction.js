/* Object */

//var o = {} // literal object
var o = new Object()

/* Array */

//var a = [] // literal array
var a = new Array()

//var a1 = [10, 20, 30]
var a1 = new Array(10, 20, 30)

/* Person */

var Person = function(name, surname, dateOfBirth) {
    this.name = name
    this.surname = surname
    this.dateOfBirth = dateOfBirth
    this.emotions = '😊'
}

Person.prototype.eat = function(meal) {
    return this.name + ': eating ' + meal + ' ...'
}

Person.prototype.read = function(readable) {
    return this.name + ': reading ' + readable + ' ...'
}

Person.prototype.salute = function(person) {
    return this.name + ': Hello, ' + person.name + '!'
}

Person.prototype.talk = function(person, what) {
    return this.name + ' to ' + person.name + ': ' + what
}

Person.prototype.changeEmotions = function(emotions) {
    this.emotions = emotions
}

var peter = new Person('Peter', 'Pan', '1990-01-01')
var wendy = new Person('Wendy', 'Darling', '1991-02-02')

peter.salute(wendy)

/* Product */

var Product = function(brand, model, sku, variant) {
    this.brand = brand
    this.model = model
    this.sku = sku
    this.variant = variant
    this.active = true
}

Product.prototype.deactivate = function() {
    this.active = false
}

var nikeAirMaxBlack = new Product('Nike', 'Air Max', 'nike-airmax-black', 'Black')
var nikeAirMaxWhite = new Product('Nike', 'Air Max', 'nike-airmax-white', 'White')
var pumaFerrariRed = new Product('Puma', 'Ferrari', 'puma-ferrari-red', 'Red')
var pumaFerrariYellow = new Product('Puma', 'Ferrari', 'puma-ferrari-yellow', 'Yellow')
var vansOlsSchoolBlack = new Product('Vans', 'Old School', 'vans-oldschool-black', 'Black')

/*
var products = []
products[0] = nikeAirMaxBlack
products[1] = nikeAirMaxWhite
products[2] = pumaFerrariRed
products[3] = pumaFerrariYellow
products[4] = vansOlsSchoolBlack
*/
//var products = [nikeAirMaxBlack, nikeAirMaxWhite, pumaFerrariRed, pumaFerrariYellow, vansOlsSchoolBlack]
var products = new Array(nikeAirMaxBlack, nikeAirMaxWhite, pumaFerrariRed, pumaFerrariYellow, vansOlsSchoolBlack)

console.clear()

for (var i = 0; i < products.length; i++) {
    // console.log(products[i].brand + ' ' + products[i].model + ' ' + products[i].variant + ' (' + products[i].sku + ')')

    var product = products[i]
    var line = product.brand + ' ' + product.model + ' ' + product.variant + ' (' + product.sku + ')'
    console.log(line)
}

/* Character */

var Character = function(name, skills) {
    this.name = name
    this.skills = skills
    this.level = 0
}

Character.prototype.do = function(what) {
    for (var i = 0; i < this.skills.length; i++) {
        var skill = this.skills[i]

        if (skill === what) {
            this.level++
            return 'OK'   
        }
    }

    this.level--
    return 'KO'
}

var squall = new Character('Squall', ['magic', 'attack', 'use object', 'talk'])

debugger
squall.do('attack') // OK
squall.do('defend') // KO
