function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

// Métodos en el prototipo
Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
};

const p1 = new Persona("Ana", 30);
//p1.saludar();

//console.log(p1 instanceof Object)

function Estudiante(nombre, edad, carrera) {
  Persona.call(this, nombre, edad); // hereda propiedades
  this.carrera = carrera;
}

Estudiante.prototype.saludar2 = function (){
  console.log(`Hola me llamo ${this.nombre} y estudio ${this.carrera}`);
}

const e1 = new Estudiante("Rodolfo", 35, 'fullstack')
//console.log(e1)
//console.log(e1.saludar())
//console.log(e1.saludar2())
//console.log(e1 instanceof Estudiante)
//console.log(e1 instanceof Persona)
//console.log(e1.estudios())
//console.log(`Muestrame: ${Estudiante}`)
//console.log(Estudiante)
//console.log(Estudiante.prototype)
//console.log(Persona.prototype)

Estudiante.prototype = Object.create(Persona.prototype); //Hereda métodos de Persona
//console.log(Estudiante.prototype)

const e2 = new Estudiante("Agus", 29, 'fullstack1')
//console.log(e2)
//console.log(e2.saludar())
//console.log(e2.saludar2())

Estudiante.prototype.constructor = Estudiante

//console.log(e2.saludar())
//console.log(e2.saludar2())

const e3 = new Estudiante('Sergio', 31, 'fullstack')
//console.log(e3.saludar())
//console.log(e3.saludar2())

Estudiante.prototype.saludar2 = function (){
  console.log(`Hola me llamo ${this.nombre} y estudio ${this.carrera}`);
}

console.log(e3.saludar())
console.log(e3.saludar2())

