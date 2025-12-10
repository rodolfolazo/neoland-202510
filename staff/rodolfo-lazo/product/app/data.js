// models

/**
 * Función constructora de User
 * @constructor
 * @param {string} id
 * @param {string} name
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {string} role
 */

function User(id, name, email, username, password, role) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.username = username;
  this.password = password;
  this.role = role;
}

/**
 * Función constructora de Pet
 * @param {string} id 
 * @param {string} userId 
 * @param {string} name 
 * @param {Date} birthdate 
 * @param {number} weight 
 * @param {string} image 
 */
function Pet(id, userId, name, birthdate, weight, image) {
  this.id = id;
  this.userId = userId;
  //this.chip = chip;
  this.name = name;
  //this.gender = gender;
  this.birthdate = birthdate;
  //this.species = species;
  //this.race = race;
  //this.colors = colors;
  this.weight = weight;
  this.image = image;
}

// manager

/**
 * Función constructora de Data: BBDD de mi aplicación
 * @constructor
 * @property {Array<User>} users - Array de usuarios registrados
 * @property {number} usersCount - Número total de usuarios
 * @property {Array<Pet>} pets - Array de mascotas registradas
 * @property {number} petsCount - Número total de mascotas
 * @property {string|null} loggedInUserId - ID del usuario logueado, o null si no hay nada
 */

function Data() {
  this.users = [];
  this.usersCount = 0;
  this.pets = [];
  this.petsCount = 0;
  this.loggedInUserId = null;
}

/**
 * Método para agregar objetos de tipo usuario
 * @param {Object} user 
 */
Data.prototype.insertUser = function (user) {
  this.users.push(user);
  this.usersCount++;
};

/**
 * Método para encontrar un usuario por su email
 * @param {string} email 
 * @returns {User|null}
 */
Data.prototype.findUserByEmail = function (email) {
  for (let i = 0; i < this.users.length; i++) {
    const user = this.users[i];

    if (user.email === email) return user;
  }

  return null;
};

/**
 * Método para encontrar un usuario por su id
 * @param {string} id 
 * @returns {User|null}
 */
Data.prototype.findUserById = function (id) {
  for (let i = 0; i < this.users.length; i++) {
    const user = this.users[i];

    if (user.id === id) return user;
  }

  return null;
};

/**
 * Método para encontrar un usuario por su username
 * @param {string} username 
 * @returns {User|null}
 */
Data.prototype.findUserByUsername = function (username) {
  for (let i = 0; i < this.users.length; i++) {
    const user = this.users[i];

    if (user.username === username) return user;
  }

  return null;
};

/**
 * Método para setear el Id del usuario actualmente logueado
 * @param {string} userId 
 */
Data.prototype.setLoggedInUserId = function (userId) {
  this.loggedInUserId = userId;
};

/**
 * 
 * @returns 
 */
Data.prototype.getLoggedInUserId = function () {
  return this.loggedInUserId;
};


/**
 * Método para agregar una mascota
 * @param {Object} pet 
 */
Data.prototype.insertPet = function (pet) {
  this.pets.push(pet);
  this.petsCount++;
};

/**
 * Método para obtener una mascota basándonos en el id del usuario
 * @param {string} userId 
 * @returns 
 */
Data.prototype.findPetsByUserId = function (userId) {
  const foundPets = [];

  for (let i = 0; i < this.pets.length; i++) {
    const pet = this.pets[i];

    if (pet.userId === userId) foundPets.push(pet);
  }

  return foundPets;
};

// Creo una instancia de Data
const data = new Data();
