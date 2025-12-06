function Logic() {}

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

Logic.prototype.logoutUser = function () {
  data.setLoggedInUserId(null);
};

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

Logic.prototype.getPets = function () {
  if (data.getLoggedInUserId() === null) throw new Error("user not logged in");

  const user = data.findUserById(data.getLoggedInUserId());
  if (user === null) throw new Error("user not found");

  const pets = data.findPetsByUserId(data.getLoggedInUserId());

  return pets;
};

Logic.prototype.renderPets = function (arr) {
  arr.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const liPet = document.createElement("li");
    liPet.className =
      "flex items-center gap-6 mb-2 border border-gray-400 p-2 mb-2";

    // Crear imagen redonda de 30x30px
    const petImg = document.createElement("img");
    petImg.src = arr[i].image;

    petImg.alt = arr[i].name;
    petImg.style.width = "45px";
    petImg.style.height = "45px";
    petImg.style.borderRadius = "50%"; // hace la imagen circular
    petImg.style.objectFit = "cover"; // asegura que se recorte bien

    // Crear texto
    const petText = document.createElement("span");
    petText.textContent = `${arr[i].name}`;
    petText.className = "w-[90px] shrink-0";

    // Crear Birth Date
    const petBirth = document.createElement("span");
    petBirth.textContent = `${arr[i].birthdate}`;

    // Añadir imagen y texto al <li>
    liPet.appendChild(petImg);
    liPet.appendChild(petText);
    liPet.appendChild(petBirth);

    //liPet.textContent = `${data.listaPets[i].name}`;
    ulPets.appendChild(liPet);
  }
};

Logic.prototype.limpiarLista = function () {
  const lista = homeView.querySelector("ul");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
};

Logic.prototype.limpiarLista2 = function () {
  const lista = homeView.querySelector("ul");
  ul.replaceChildren();
};

// instance

const logic = new Logic();
