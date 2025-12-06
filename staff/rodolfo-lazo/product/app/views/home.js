const homeView = document.createElement("div");
homeView.style.display = "none";

const homeTitle = document.createElement("h1");
homeTitle.textContent = "MyPet";
homeTitle.className = "font-bold text-xl";
homeView.appendChild(homeTitle);

const homeSubtitle = document.createElement("h2");
homeSubtitle.textContent = "Welcome Home!";
homeSubtitle.className = "mb-4";
homeView.appendChild(homeSubtitle);

const homeTopPanel = document.createElement("div");
homeTopPanel.className = "flex justify-between mb-4";
homeView.appendChild(homeTopPanel);

const homeAddPetButton = document.createElement("button");
homeAddPetButton.textContent = "+ Pet";
homeAddPetButton.type = "button";
homeAddPetButton.className = "bg-black text-white px-1";
homeTopPanel.appendChild(homeAddPetButton);

homeAddPetButton.addEventListener("click", function (event) {
  event.preventDefault();

  homeView.style.display = "none";
  addPetView.style.display = "";
});

const homeLogoutButton = document.createElement("button");
homeLogoutButton.textContent = "Logout";
homeLogoutButton.type = "button";
homeLogoutButton.className = "bg-black text-white px-1";
homeTopPanel.appendChild(homeLogoutButton);

homeLogoutButton.addEventListener("click", function (event) {
  event.preventDefault();

  logic.logoutUser();

  for (let i = ulPets.children.length - 1; i >= 0; i--) {
    const child = ulPets.children[i];

    child.remove();
  }

  homeView.style.display = "none";
  loginView.style.display = "";
});

//Creo ul de pets
const ulPets = document.createElement("ul");

homeView.appendChild(ulPets);

document.body.appendChild(homeView);
