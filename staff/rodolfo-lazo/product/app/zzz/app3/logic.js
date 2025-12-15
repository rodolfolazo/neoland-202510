function Logic() { }

/**
 * Método para registrar un usuario
 * @function registerUser
 * @memberof Logic
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} username 
 * @param {string} password 
 * @param {string} passwordRepeat 
 * 
 * @returns {void}
 * @throws {Error} Lanza error si el nombre de usuario, email , username, password, passwordRepeat no son correctos
 */
Logic.prototype.registerUser = function (
  name,
  email,
  username,
  password,
  passwordRepeat
) {
  if (typeof name !== "string") throw new Error("invalid name type");
  if (name.length < 1) throw new Error("invalid name length");

  if (typeof email !== "string") throw new Error("invalid email type");
  if (email.length < 6) throw new Error("invalid email length");

  if (typeof username !== "string") throw new Error("invalid username type");
  if (username.length < 3) throw new Error("invalid username length");

  if (typeof password !== "string") throw new Error("invalid password type");
  if (password.length < 8) throw new Error("invalid password length");

  if (typeof passwordRepeat !== "string")
    throw new Error("invalid passwordRepeat type");
  if (passwordRepeat.length < 8)
    throw new Error("invalid passwordRepeat length");

  if (password !== passwordRepeat) throw new Error("passwords do not match");

  let user = data.findUserByEmail(email);

  if (user !== null) throw new Error("user email already exists");

  user = data.findUserByUsername(username);

  if (user !== null) throw new Error("user username already exists");

  user = new User(
    "user-" + data.usersCount,
    name,
    email,
    username,
    password,
    "regular"
  );

  data.insertUser(user);
};


/**
 * Método para hacer el login de un usuario
 * @function loginUser
 * @memberof Logic
 * 
 * @param {string} username 
 * @param {string} password
 * 
 * @returns {void}
 */
Logic.prototype.loginUser = function (username, password) {
  if (typeof username !== "string") throw new Error("invalid username type");
  if (username.length < 3) throw new Error("invalid username length");

  if (typeof password !== "string") throw new Error("invalid password type");
  if (password.length < 8) throw new Error("invalid password length");

  const user = data.findUserByUsername(username);

  if (user === null) throw new Error("user not found");

  if (user.password !== password) throw new Error("incorrect password");

  data.setLoggedInUserId(user.id);
};


/**
 * Método para poner el id de sesion como nulo
 * @function logoutUser
 * @memberof Logic
 * 
 * @returns {void}
 */
Logic.prototype.logoutUser = function () {
  data.setLoggedInUserId(null);
};


/**
 * Obtener el nombre del usuario logueado
 * @function getUserName
 * @memberof Logic
 * 
 * @returns {string} El nombre del usuario logueado
 * @throws {Error} Lanza un error si no se encuentra un usuario con el ID actual
 *
 */
Logic.prototype.getUserName = function () {  
  for (let i = 0; i < data.users.length; i++) {
    const user = data.users[i]

    if (data.getLoggedInUserId() === user.id) {
      return user.name;      
    }    
  }
  
  throw new Error("user not found")  
}

/**
 * Valida los datos y agrega una mascota al usuario actual
 * @function addPet
 * @memberof Logic
 *
 * @param {string} name - Nombre de la mascota
 * @param {string} birthdate - Fecha de nacimiento
 * @param {number} weight - Peso de la mascota
 * @param {string} image - URL de la imagen
 *
 * @returns {void}
 * @throws {Error} Si el usuario no está logueado
 * @throws {Error} Si el usuario no existe
 * @throws {Error} si los datos son inválidos
 */
Logic.prototype.addPet = function (name, birthdate, weight, image) {
  if (data.getLoggedInUserId() === null) throw new Error("user not logged in");

  const user = data.findUserById(data.getLoggedInUserId());
  if (user === null) throw new Error("user not found");

  if (typeof name !== "string") throw new Error("invalid name type");
  if (name.length < 1) throw new Error("invalid name length");

  if (typeof birthdate !== "string") throw new Error("invalid birthdate type");

  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(birthdate))
    throw new Error("invalid birthdate format");

  if (typeof weight !== "number" || isNaN(weight))
    throw new Error("invalid weight type");

  if (typeof image !== "string") throw new Error("invalid image type");

  const urlRegex = /(www|http:|https:)+[^\s]+[\w]/;
  if (!urlRegex.test(image)) throw new Error("invalid image format");

  const pet = new Pet(
    "pet-" + data.petsCount,
    data.getLoggedInUserId(),
    name,
    birthdate,
    weight,
    image
  );

  data.insertPet(pet);
};


/**
 * Obtiene todas las mascotas del usuario actualmente logueado
 * @function getPets
 * @memberof Logic
 * 
 * @returns {Array<Pet>} - Lista de mascotas asociadas al usuario
 * @throws {Error} Si no hay usuario logueado
 * @throws {Error} Si el usuario no existe
 */
Logic.prototype.getPets = function () {
  if (data.getLoggedInUserId() === null) throw new Error("user not logged in");

  const user = data.findUserById(data.getLoggedInUserId());
  if (user === null) throw new Error("user not found");

  const pets = data.findPetsByUserId(data.getLoggedInUserId());

  return pets;
};

/**
 * Elimina una mascota dado un id de mascota
 * @function deletePet
 * @memberof Logic
 * 
 * @param {string} petId
 * 
 * @return {void}
 */
Logic.prototype.deletePet = function(petId){
  for(let i=0; i<data.pets.length; i++){
    const pet = data.pets[i]   

    if (pet.id === petId){
      data.pets.splice(i,1)
    }    
  }
}

// instance

const logic = new Logic();
