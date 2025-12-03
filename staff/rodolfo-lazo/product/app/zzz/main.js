// LANDING VIEW

const landingView = document.createElement("div");

const landingTitle = document.createElement("h1");
landingTitle.textContent = "MyPet";
landingView.appendChild(landingTitle);

const landingWelcome = document.createElement("p");
landingWelcome.textContent = "Welcome!";
landingView.appendChild(landingWelcome);

const landingAccess = document.createElement("p");
const landingLoginLink = document.createElement("a");
landingLoginLink.classList.add("button");
landingLoginLink.textContent = "Login";
landingLoginLink.href = "";
landingAccess.appendChild(landingLoginLink);
const landingOrText = document.createTextNode(" or ");
landingAccess.appendChild(landingOrText);
const landingRegisterLink = document.createElement("a");
landingRegisterLink.classList.add("button");
landingRegisterLink.textContent = "Register";
landingRegisterLink.href = "";
landingAccess.appendChild(landingRegisterLink);
landingView.appendChild(landingAccess);

landingLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "none";
  loginView.style.display = "";
});

landingRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "none";
  registerView.style.display = "";
});

document.body.appendChild(landingView);

// Register View

const registerView = document.createElement("div");
registerView.style.display = "none";

const registerTitle = document.createElement("h1");
registerTitle.textContent = "MyPet";
registerView.appendChild(registerTitle);

const registerSubtitle = document.createElement("h2");
registerSubtitle.textContent = "Register";
registerView.appendChild(registerSubtitle);

//Register Form

const registerForm = document.createElement("form");
//name
const registerNameLabel = document.createElement("label");
registerNameLabel.htmlFor= "name"
registerNameLabel.textContent = "Name";
registerForm.appendChild(registerNameLabel);
const registerNameInput = document.createElement("input");
registerNameInput.type = "text";
registerNameInput.id = "name";
registerForm.appendChild(registerNameInput);
//email
const registerEmailLabel = document.createElement("label");
registerEmailLabel.htmlFor = "email"
registerEmailLabel.textContent = "Email";
registerForm.appendChild(registerEmailLabel);
const registerEmailInput = document.createElement("input");
registerEmailInput.type = "email";
registerEmailInput.id = "email";
registerForm.appendChild(registerEmailInput);
//username
const registerUsernameLabel = document.createElement("label");
registerUsernameLabel.textContent = "Username";
registerUsernameLabel.htmlFor="username"
registerForm.appendChild(registerUsernameLabel);
const registerUsernameInput = document.createElement("input");
registerUsernameInput.type = "text";
registerUsernameInput.id="email";
registerForm.appendChild(registerUsernameInput);
//password
const registerPasswordLabel = document.createElement("label");
registerPasswordLabel.textContent = "Password";
registerPasswordLabel.htmlFor = "password"
registerForm.appendChild(registerPasswordLabel);
const registerPasswordInput = document.createElement("input");
registerPasswordInput.type = "password";
registerPasswordInput.id="password";
registerForm.appendChild(registerPasswordInput);
const registerPasswordShow = document.createElement("button");
registerPasswordShow.type ="button";
registerPasswordShow.textContent = "Show";
registerPasswordShow.style.marginLeft = "10px";
registerForm.appendChild(registerPasswordShow);

//Password handle
registerPasswordShow.addEventListener('click',(e)=>{
  e.preventDefault();
  if (e.target.textContent === 'Show'){    
    e.target.textContent = "Hide";
    registerPasswordInput.type = "text";
  }else{    
    e.target.textContent = 'Show';
    registerPasswordInput.type = "password";
  }
});

//Repeat password
const registerPasswordRepeatLabel = document.createElement("label");
registerPasswordRepeatLabel.textContent = "Repeat Password";
registerPasswordRepeatLabel.htmlFor ="repeatPassword";
registerForm.appendChild(registerPasswordRepeatLabel);

const registerPasswordRepeatInput = document.createElement("input");
registerPasswordRepeatInput.type = "password";
registerPasswordRepeatInput.id = "repeatPassword";
registerForm.appendChild(registerPasswordRepeatInput);

const registerRepeatPasswordShow = document.createElement("button");
registerRepeatPasswordShow.type ="button";
registerRepeatPasswordShow.textContent = "Show";
registerRepeatPasswordShow.style.marginLeft = "10px";

registerForm.appendChild(registerRepeatPasswordShow);
//Button Registrar
const registerSubmitButton = document.createElement("button");
registerSubmitButton.textContent = "Register";
registerSubmitButton.style.display = 'block';
registerSubmitButton.classList.add("button")
registerSubmitButton.classList.add("button-primary")

registerForm.appendChild(registerSubmitButton);
registerView.appendChild(registerForm);

//Repeat password handle
registerRepeatPasswordShow.addEventListener('click',(e)=>{
  e.preventDefault();
  if (e.target.textContent === 'Show'){    
    e.target.textContent = "Hide";
    registerPasswordRepeatInput.type = "text";
  }else{    
    e.target.textContent = 'Show';
    registerPasswordRepeatInput.type = "password";
  }
});

// Handle register form submission

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = registerNameInput.value;
  const email = registerEmailInput.value;
  const username = registerUsernameInput.value;
  const password = registerPasswordInput.value;
  const passwordRepeat = registerPasswordRepeatInput.value;

  try {
    logic.registerUser(name, email, username, password, passwordRepeat);

    registerForm.reset();
    registerFeedback.textContent = "";

    registerView.style.display = "none";
    loginView.style.display = "";
  } catch (error) {
    registerFeedback.textContent = error.message;
  }
});

const registerLoginLink = document.createElement("a");
registerLoginLink.textContent = "Login";
registerLoginLink.href = "";
registerView.appendChild(registerLoginLink);

registerLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  registerView.style.display = "none";
  loginView.style.display = "";
});

const registerFeedback = document.createElement("p");
registerFeedback.classList.add("feedback");
registerView.appendChild(registerFeedback);

document.body.appendChild(registerView);

// login Form

const loginView = document.createElement("div");
loginView.style.display = "none";

const loginTitle = document.createElement("h1");
loginTitle.textContent = "MyPet";
loginView.appendChild(loginTitle);

const loginSubtitle = document.createElement("h2");
loginSubtitle.textContent = "Login";
loginView.appendChild(loginSubtitle);

const loginForm = document.createElement("form");
const loginUsernameLabel = document.createElement("label");
loginUsernameLabel.textContent = "Username";
loginForm.appendChild(loginUsernameLabel);
const loginUsernameInput = document.createElement("input");
loginUsernameInput.type = "text";
loginForm.appendChild(loginUsernameInput);
const loginPasswordLabel = document.createElement("label");
loginPasswordLabel.textContent = "Password";
loginForm.appendChild(loginPasswordLabel);
const loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginForm.appendChild(loginPasswordInput);
const loginSubmitButton = document.createElement("button");
loginSubmitButton.textContent = "Login";
loginForm.appendChild(loginSubmitButton);
loginView.appendChild(loginForm);

const loginRegisterLink = document.createElement("a");
loginRegisterLink.textContent = "Register";
loginRegisterLink.href = "";
loginView.appendChild(loginRegisterLink);

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();

  loginView.style.display = "none";
  registerView.style.display = "";
});

const loginFeedback = document.createElement("p");
loginFeedback.classList.add("feedback");
loginView.appendChild(loginFeedback);

//Handle login form submission
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  try {
    logic.loginUser(username, password);

    loginForm.reset();

    loginFeedback.textContent = "";

    loginView.style.display = "none";

    homeView.style.display = "";
  } catch (error) {
    loginFeedback.textContent = error.message;
  }
});

document.body.appendChild(loginView);


//HOME VIEW
const homeView = document.createElement("div");
homeView.style.display = "none";

const homeTitle = document.createElement("h1");
homeTitle.textContent = "MyPet";
const homeLogoutLink = document.createElement("a");
homeLogoutLink.textContent = "Logout"
homeLogoutLink.classList.add("button")
homeLogoutLink.classList.add("button-primary")
homeLogoutLink.style.cursor = "pointer"

homeLogoutLink.addEventListener("click", function (event) {
  event.preventDefault();

  landingView.style.display = "";
  homeView.style.display = "none";
});

homeView.appendChild(homeTitle);
homeView.appendChild(homeLogoutLink);

document.body.appendChild(homeView)