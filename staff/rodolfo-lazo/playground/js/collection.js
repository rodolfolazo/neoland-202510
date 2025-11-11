var collection = {
  count: 0,
};

// TODO implement add method

collection.add = function (item) {
  this[this.count] = item;
  this.count++;
};

collection.add("Peter");
console.log(collection);
// { 0: 'Peter', count: 1 }

collection.add("Wendy");
console.log(collection);
// { 0: 'Peter', 1: 'Wendy', count: 2 }

collection.add("James");
console.log(collection);
// { 0: 'Peter', 1: 'Wendy', 2: 'James', count: 3 }

// TODO implement remove method
collection.remove = function (index) {
  if (index < 0 || index >= this.count) {
    console.warn("Índice fuera de rango");
    return;
  }

  // Mover todos los elementos hacia atrás
  for (let i = index; i < this.count - 1; i++) {
    this[i] = this[i + 1];
  }

  // Eliminar el último elemento duplicado
  delete this[this.count - 1];

  // Actualizar el contador
  this.count--;
};
