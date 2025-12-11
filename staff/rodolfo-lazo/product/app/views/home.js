const homeView = createView()
hideView(homeView)

const homeTitle = createTitle()
setTextContent(homeTitle, 'MyPet')
setClass(homeTitle, 'font-bold text-xl')
addChild(homeView,homeTitle)

const homeSubtitle = createSubtitle()
setTextContent(homeSubtitle,'Welcome Home!')
setClass(homeSubtitle,'mb-4')
addChild(homeView, homeSubtitle)

const homeTopPanel = createPanel()
setClass(homeTopPanel,'flex justify-between mb-4')
addChild(homeView, homeTopPanel)

const homeAddPetButton = createButton()
setTextContent(homeAddPetButton, '+ Pet')
setType(homeAddPetButton, 'button')
setClass(homeAddPetButton, 'bg-black text-white px-1')
addChild(homeTopPanel, homeAddPetButton)

homeAddPetButton.addEventListener("click", function (event) {
  event.preventDefault();
  
  hideView(homeView)
  showView(addPetView)  
});

const homeLogoutButton = document.createElement("button");
setTextContent(homeLogoutButton, 'Logout')
setType(homeLogoutButton, 'button')
setClass(homeLogoutButton, 'bg-black text-white px-1')
addChild(homeTopPanel, homeLogoutButton)

homeLogoutButton.addEventListener("click", function (event) {
  event.preventDefault();

  logic.logoutUser();

  //Limpiar nombre  
  setTextContent(nameHome, '')

  clearPetList()

  hideView(homeView)  
  showView(loginView)
});

const nameHome = document.createElement("h3");
addChild(homeView, nameHome)

//Creo ul de pets
const petList = createUnorderedList()
addChild(homeView, petList)

addChild(document.body, homeView)

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
    /* petPhoto.style.width = "45px";
    petPhoto.style.height = "45px";
    petPhoto.style.borderRadius = "50%"; // hace la imagen circular
    petPhoto.style.objectFit = "cover"; // asegura que se recorte bien */
    setClass(petPhoto, 'w-[45px] h-[45px] rounded-full object-cover')

    // Crear texto
    const petName = document.createElement("span");
    setTextContent(petName, pet.name)
    setClass(petName, 'w-[90px] shrink-0')
    
    // Crear Birth Date
    const petBirth = document.createElement("span");    
    setTextContent(petBirth,pet.birthdate)

    // Añadir imagen y texto al <li>    
    addChild(petItem, petPhoto)
    addChild(petItem, petName)
    addChild(petItem, petBirth)
        
    addChild(petList,petItem)
  }
}

function clearPetList() {
  const lista = homeView.querySelector("ul");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
};