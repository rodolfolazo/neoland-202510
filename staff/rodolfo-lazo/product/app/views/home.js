const homeView = createView()
hideView(homeView)

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

  //Limpiar nombre
  nameHome.textContent = ""

  clearPetList()

  homeView.style.display = "none";
  loginView.style.display = "";
});

const nameHome = document.createElement("h3");
homeView.appendChild(nameHome)

//Creo ul de pets
const petList = document.createElement("ul");
homeView.appendChild(petList);

document.body.appendChild(homeView);

function renderPetList(pets) {  
  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i]
    const petItem = document.createElement("li");
    petItem.className =
      "flex items-center gap-6 mb-2 border border-gray-400 p-2 mb-2";

    // Crear imagen redonda de 30x30px
    const petPhoto = document.createElement("img");
    petPhoto.src = pet.image;

    petPhoto.alt = pet.name;
    petPhoto.style.width = "45px";
    petPhoto.style.height = "45px";
    petPhoto.style.borderRadius = "50%"; // hace la imagen circular
    petPhoto.style.objectFit = "cover"; // asegura que se recorte bien

    // Crear texto
    const petName = document.createElement("span");
    petName.textContent = pet.name;
    petName.className = "w-[90px] shrink-0";

    // Crear Birth Date
    const petBirth = document.createElement("span");
    petBirth.textContent = pet.birthdate;

    // Añadir imagen y texto al <li>
    petItem.appendChild(petPhoto);
    petItem.appendChild(petName);
    petItem.appendChild(petBirth);

    //liPet.textContent = `${data.listaPets[i].name}`;
    petList.appendChild(petItem);
  }
}

function clearPetList() {
  const lista = homeView.querySelector("ul");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
};