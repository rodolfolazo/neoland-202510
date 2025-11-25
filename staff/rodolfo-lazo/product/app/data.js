//models

function User(id, name, email, username, password, role) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.username = username;
  this.password = password;
  this.role = role;
}

function Pet(id, userId, chip, name, gender, birthdate, species, race, colors) {
  this.id = id;
  this.userId = userId;
  this.chip = chip;
  this.name = name;
  this.birthdate = birthdate;
  this.species = species;
}

//data management
function Data() {
  this.users = [];
  this.usersCount = 0;
  this.pets = [];
  this.petsCount = 0;
}

Data.prototype.insertUser = function (user) {
  this.users.push(user);
  this.usersCount++;
};

Data.prototype.insertPet = function (pet) {
  this.pets.push(pet);
  this.petsCount++;
};

const data = new Data();
