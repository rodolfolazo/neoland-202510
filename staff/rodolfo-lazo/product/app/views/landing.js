// landing

const landingView = document.createElement("div");
// landingView.style.display = 'none'

const landingTitle = document.createElement("h1");
landingTitle.textContent = "MyPet";
landingTitle.className = "font-bold text-xl";
landingView.appendChild(landingTitle);

const landingWelcome = document.createElement("p");
landingWelcome.textContent = "Welcome!";
landingWelcome.className = "mb-4";
landingView.appendChild(landingWelcome);

const landingNavigation = document.createElement("nav");
const landingLoginLink = document.createElement("a");
landingLoginLink.textContent = "Login";
landingLoginLink.href = "";
landingLoginLink.className = "underline font-bold";
landingNavigation.appendChild(landingLoginLink);
const landingOrText = document.createTextNode(" or ");
landingNavigation.appendChild(landingOrText);
const landingRegisterLink = document.createElement("a");
landingRegisterLink.textContent = "Register";
landingRegisterLink.href = "";
landingRegisterLink.className = "underline font-bold";
landingNavigation.appendChild(landingRegisterLink);
landingView.appendChild(landingNavigation);

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
