// login

const loginView = document.createElement("div");
loginView.style.display = "none";

const loginTitle = document.createElement("h1");
loginTitle.textContent = "MyPet";
loginTitle.className = "font-bold text-xl";
loginView.appendChild(loginTitle);

const loginSubtitle = document.createElement("h2");
loginSubtitle.textContent = "Login";
loginSubtitle.className = "font-bold mb-4";
loginView.appendChild(loginSubtitle);

const loginForm = document.createElement("form");
loginForm.className = "flex flex-col";
const loginUsernameLabel = document.createElement("label");
loginUsernameLabel.textContent = "Username";
loginUsernameLabel.htmlFor = "username";
loginForm.appendChild(loginUsernameLabel);
const loginUsernameInput = document.createElement("input");
loginUsernameInput.id = "username";
loginUsernameInput.type = "text";
loginUsernameInput.className = "border px-1";
loginForm.appendChild(loginUsernameInput);
const loginPasswordLabel = document.createElement("label");
loginPasswordLabel.textContent = "Password";
loginPasswordLabel.htmlFor = "password";
loginForm.appendChild(loginPasswordLabel);
const loginPasswordInput = document.createElement("input");
loginPasswordInput.id = "password";
loginPasswordInput.type = "password";
loginPasswordInput.className = "border px-1";
loginForm.appendChild(loginPasswordInput);
const loginShowPasswordButton = document.createElement("button");
loginShowPasswordButton.textContent = "Show";
loginShowPasswordButton.type = "button";
loginShowPasswordButton.className = "self-end";
loginForm.appendChild(loginShowPasswordButton);

loginShowPasswordButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (loginPasswordInput.type === "password") {
    loginPasswordInput.type = "text";
    loginShowPasswordButton.textContent = "Hide";
    loginPasswordInput.className = "border px-1 bg-[gold]";
  } else {
    loginPasswordInput.type = "password";
    loginShowPasswordButton.textContent = "Show";
    loginPasswordInput.className = "border px-1";
  }
});

const loginSubmitButton = document.createElement("button");
loginSubmitButton.textContent = "Login";
loginSubmitButton.type = "submit";
loginSubmitButton.className = "bg-black text-white px-1 self-center";
loginForm.appendChild(loginSubmitButton);
loginView.appendChild(loginForm);

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  try {
    logic.loginUser(username, password);

    loginForm.reset();
    loginFeedback.textContent = "";

    //Creo array de Pets de usuario logueado

    const pets = logic.getPets();

    /* for (let i = 0; i < pets.length; i++) {
      const liPet = document.createElement("li");
      liPet.className =
        "flex items-center gap-6 mb-2 border border-gray-400 p-2 mb-2";

      // Crear imagen redonda de 30x30px
      const petImg = document.createElement("img");
      petImg.src = pets[i].image;

      petImg.alt = pets[i].name;
      petImg.style.width = "45px";
      petImg.style.height = "45px";
      petImg.style.borderRadius = "50%"; // hace la imagen circular
      petImg.style.objectFit = "cover"; // asegura que se recorte bien

      // Crear texto
      const petText = document.createElement("span");
      petText.textContent = `${pets[i].name}`;
      petText.className = "w-[90px] shrink-0";

      // Crear Birth Date
      const petBirth = document.createElement("span");
      petBirth.textContent = `${pets[i].birthdate}`;

      // Añadir imagen y texto al <li>
      liPet.appendChild(petImg);
      liPet.appendChild(petText);
      liPet.appendChild(petBirth);

      //liPet.textContent = `${data.listaPets[i].name}`;
      ulPets.appendChild(liPet);
    } */

    logic.renderPets(pets);

    loginView.style.display = "none";
    homeView.style.display = "";

    console.log(data.loggedInUserId);
    let nombre = "";

    for (let i = 0; i < data.users.length; i++) {
      if (data.loggedInUserId === data.users[i].id) {
        nombre = data.users[i].name;
      }
    }

    const nombreHome = document.createElement("h3");
    nombreHome.textContent = `Hola ${nombre}`;
    nombreHome.className = "mb-2";

    //Añado título y lista al dom
    homeView.appendChild(nombreHome);
    homeView.appendChild(ulPets);
  } catch (error) {
    loginFeedback.textContent = error.message;
  }
});

const loginRegisterLink = document.createElement("a");
loginRegisterLink.textContent = "Register";
loginRegisterLink.href = "";
loginRegisterLink.className = "underline font-bold";
loginView.appendChild(loginRegisterLink);

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "";
});

const loginFeedback = document.createElement("p");
loginView.appendChild(loginFeedback);

document.body.appendChild(loginView);
