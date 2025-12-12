//id del pet seleccionado para borrar
let petId = ''

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
    setClass(petPhoto, 'w-[45px] h-[45px] rounded-full object-cover')

    // Crear texto
    const petName = document.createElement("span");
    setTextContent(petName, pet.name)
    setClass(petName, 'w-[90px] shrink-0')
    
    // Crear Birth Date
    const petBirth = document.createElement("span");    
    setTextContent(petBirth,pet.birthdate)

    //Crear Delete
    const petDelete = createElement('span')    
    setDataId(petDelete, pet.id)
    setTextContent(petDelete, '🗑️')
    addClass(petDelete, 'ml-auto')
    addClass(petDelete, 'bg-black')    
    addClass(petDelete, 'petBin')

    // Añadir imagen y texto al <li>    
    addChild(petItem, petPhoto)
    addChild(petItem, petName)
    addChild(petItem, petBirth)
    addChild(petItem, petDelete)
        
    addChild(petList,petItem)
  }
}

function clearPetList() {
  const lista = homeView.querySelector("ul");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
};

//Ventana Modal
const modal = createElement('div')
setClass(modal, 'hidden fixed inset-0 bg-black/75 flex items-center justify-center')
const modalContent = createElement('div')
setClass(modalContent, 'bg-white rounded-lg shadow-lg w-80 p-6 relative')
const modalTitle = createElement('p')
setTextContent(modalTitle, 'Delete Pet?')
setClass(modalTitle, 'text-center')
const modalButtons = createElement('div')
setClass(modalButtons,'flex justify-center gap-4')
const modalYes = createElement('span')
setTextContent(modalYes, '✅')
const modalNo = createElement('span')
setTextContent(modalNo, '❌')
addChild(modalButtons,modalYes)
addChild(modalButtons,modalNo)
addChild(modalContent, modalTitle)
addChild(modalContent, modalButtons)
addChild(modal, modalContent)
addChild(document.body, modal)


//Detector de eventos de cesta de borrado
petList.addEventListener('click', function(evt){
  if (evt.target.classList.contains('petBin')){
    removeClass(modal, 'hidden')
    petId = evt.target.dataset.id    
  }
})

modalNo.addEventListener('click', function(evt){
  addClass(modal, 'hidden')
})

modalYes.addEventListener('click', function(evt){  
  addClass(modal, 'hidden')
  logic.deletePet(petId)
  petId = ''
  clearPetList()
  const pets = logic.getPets();
  renderPetList(pets)    
})