// test add

// case add names
{
  const names = new Collection();
  names.add("Juan");
  names.add("Sergio");
  names.add("Laura");
  names.add("Albert");
  names.add("Sergio");
  // console.log(names)
  // Collection { 0: Juan, 1: Sergio, 2: Laura, 3: Albert, 4: Sergio, count: 5 }
  console.assert(names.count === 5, "names.count is 5");
  console.assert(names[0] === "Juan", "names[0] is Juan");
  console.assert(names[1] === "Sergio", "names[1] is Sergio");
  console.assert(names[2] === "Laura", "names[2] is Laura");
  console.assert(names[3] === "Albert", "names[3] is Albert");
  console.assert(names[4] === "Sergio", "names[4] is Sergio");
}

// case add colors
{
  const colors = new Collection();
  colors.add("red");
  colors.add("green");
  colors.add("blue");
  // console.log(colors)
  // Collection { 0: red, 1: green, 2: blue, count: 3 }
  console.assert(colors.count === 3, "colors.count is 3");
  console.assert(colors[0] === "red", "colors[0] is red");
  console.assert(colors[1] === "green", "colors[1] is green");
  console.assert(colors[2] === "blue", "colors[2] is blue");
}

// case add numbers
{
  const nums = new Collection();
  nums.add(3.141516); // PI
  nums.add(666); // (..)
  nums.add(2000);
  // console.log(nums)
  // Collection { 0: 3.141516, 1: 666, 2: 2000, count: 3 }
  console.assert(nums.count === 3, "nums.count is 3");
  console.assert(nums[0] === 3.141516, "nums[0] is 3.141516");
  console.assert(nums[1] === 666, "nums[1] is 666");
  console.assert(nums[2] === 2000, "nums[2] is 2000");
}

// TODO test update
// TODO test updateFirst
// TODO test push
// TODO test pop
// TODO test shift
// TODO test includes

// test forEach

// case print fruits
{
  const fruits = new Collection();
  fruits[0] = "Apple";
  fruits[1] = "Banana";
  fruits[2] = "Orange";
  fruits.count = 3;

  const box = [];
  fruits.forEach(function (fruit) {
    //console.log(fruit)
    box.push(fruit);
  });
  // console.log(box)
  // [ Apple, Banana, Orange ]
  console.assert(box.length === 3, "box length is 3");
  console.assert(box[0] === "Apple", "box[0] is Apple");
  console.assert(box[1] === "Banana", "box[1] is Banana");
  console.assert(box[2] === "Orange", "box[2] is Orange");
}

// case calculate total
{
  const prices = new Collection();
  prices[0] = 150;
  prices[1] = 30;
  prices[2] = 45;
  prices[3] = 25;
  prices.count = 4;

  let total = 0;

  prices.forEach((price) => (total += price * 1.21));
  // console.log(total)
  // 302.5
  console.assert(total === 302.5, "total is 302.5");
}

// TODO test remove
{
  const colorsCollection = new Collection();

  colorsCollection.add("red");
  colorsCollection.add("green");
  colorsCollection.add("blue");
  colorsCollection.add("green");

  //console.log(colorsCollection);
  //console.log("Eliminamos green");
  colorsCollection.remove2("green");
  console.assert(colorsCollection.count === 2, "El número de elementos es 2");
  console.assert(colorsCollection[1] === "blue");
  console.assert(colorsCollection[colorsCollection.count - 1] === "blue");
  //console.log("Resultado:");
  //console.log(colorsCollection);
}

// TODO test removeFirst
{
  const citiesCollection = new Collection();

  citiesCollection.add("Gent");
  citiesCollection.add("Brugge");
  citiesCollection.add("Krakow");
  citiesCollection.add("Krakow");
  citiesCollection.add("Zagreb");

  //console.log(citiesCollection);
  //console.log("Eliminamos sólo 1 Krakow");
  citiesCollection.removeFirst2("Krakow");
  console.assert(citiesCollection.count === 4, "El número de elementos es 4");
  console.assert(citiesCollection[3] === "Zagreb");
  //console.log(citiesCollection);
}

//test map
// case name to uppercase

{
  const names = new Collection();
  names[0] = "Rodolfo";
  names[1] = "Serito";
  names[2] = "Agus";
  names[3] = "Albert";
  names[4] = "Juanico";
  names.count = 5;

  const namesInUppercase = names.map((name) => name.toUpperCase());
  console.assert(namesInUppercase.count === 5, "El número de elementos es 5");
  console.assert(
    namesInUppercase[0] === "RODOLFO",
    "namesInUpperCase[0] is RODOLFO",
  );
  console.assert(
    namesInUppercase[1] === "SERITO",
    "namesInUpperCase[1] is SERITO",
  );
  console.assert(namesInUppercase[2] === "AGUS", "namesInUpperCase[2] is AGUS");
  console.assert(
    namesInUppercase[3] === "ALBERT",
    "namesInUpperCase[3] is ALBERT",
  );
  console.assert(
    namesInUppercase[4] === "JUANICO",
    "namesInUpperCase[4] is JUANICO",
  );
}

// test filter
// edades menor a 18 años
{
  const edades = new Collection();
  edades[0] = 17;
  edades[1] = 55;
  edades[2] = 13;
  edades[3] = 47;
  edades[4] = 33;
  edades[5] = 11;
  edades.count = 6;

  const edadesFiltradas = edades.filter((edad) => edad <= 18);
  console.assert(
    edadesFiltradas.count === 3,
    " El número de edades menores de 18 son 3",
  );
  console.assert(edadesFiltradas[0] === 17, "La primera edad es 17");
  console.assert(edadesFiltradas[1] === 13, "La segunda edad es 13");
  console.assert(edadesFiltradas[2] === 11, "La tercera edad es 11");
  // console.log(edadesFiltradas)
}

// test some
// ¿Existe alguno mayor que 18 años?

{
  const edades = new Collection();
  edades[0] = 17;
  edades[1] = 55;
  edades[2] = 13;
  edades[3] = 47;
  edades[4] = 33;
  edades[5] = 11;
  edades.count = 6;

  const hayAdultos = edades.some((edad) => edad >= 18);
  console.assert(hayAdultos === true);  
}

// test every
// ¿Son todos mayores de edad?

{
  const ages = new Collection();
  ages[0] = 47;
  ages[1] = 25;
  ages[2] = 33;
  ages.count = 3;

  let isEveryoneAdult = ages.every((age) => age >= 18);
  console.assert(isEveryoneAdult === true, "Todos son adultos");
  // console.log(isEveryoneAdult)
}


{
  const persons = new Collection();
  persons[0] = {
    name : 'Mario',
    role : 'frontend'
  }
  persons[1] = {
    name : 'Daniela',
    role : 'frontend'
  }
  persons[2] = {
    name : 'Piotr',
    role : 'backend'
  }
  persons[3] = {
    name : 'Arkadiusz',
    role : 'backend'
  }
  persons[4] = {
    name : 'Nelly',
    role : 'bbdd'
  }
  persons.count = 5

  let firstDB = persons.find(person => person.role === 'bbdd')
  console.assert(firstDB.name === 'Nelly' && firstDB.role === 'bbdd')
}


{
  const ages = new Collection();
  ages[0] = 47;
  ages[1] = 25;
  ages[2] = 33;
  ages.count = 3;

  total1 = ages.reduce((total,num)=>{
    return total + num
  },100)

  total2 = ages.reduce((total,num) => {
    return total + num
  })

  console.assert(total1 === 205, "La suma total empezando con 100 es 205" )
  console.assert(total2 === 105 , 'La suma total empezando de 0 es 105')
}