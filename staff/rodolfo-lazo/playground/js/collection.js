var collection = {
  count: 0,
};

// TODO implement add method

collection.add = function (item) {
  this[this.count] = item;
  this.count++;
};

// TODO implement remove method
collection.removeIndex = function (index) {
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

collection.remove = function (item) {
  for (let i = 0; i < this.count - 1; i++) {
    if (this[i] === item) {
      delete this[i];
      return;
    }
  }
};

collection.add("Peter");
collection.add("Wendy");
collection.add("James");

collection.remove("Wendy");
console.log(collection);
