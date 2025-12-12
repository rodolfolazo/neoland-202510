// VISTA ADD PET

const addPetView = createView()
hideView(addPetView)

const addPetTitle = createTitle()
setTextContent(addPetTitle, 'MyPet')
setClass(addPetTitle, 'font-bold text-xl')
addChild(addPetView, addPetTitle)

const addPetTopPanel = createPanel()
addPetTopPanel.className = "";
setClass(addPetTopPanel, 'flex justify-between')
addChild(addPetView, addPetTopPanel)

const addPetSubtitle = createSubtitle();
setTextContent(addPetSubtitle, 'Add Pet')
setClass(addPetSubtitle, 'font-bold')
addChild(addPetTopPanel, addPetSubtitle)

const addPetBackLink = createLink()
setTextContent(addPetBackLink, '< Back')
setHref(addPetBackLink, '')
setClass(addPetBackLink, 'underline font-bold')
addChild(addPetTopPanel, addPetBackLink)


addPetBackLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(addPetView)
  showView(homeView)  
});

// Formulario Add Pet

const addPetForm = createForm()
setClass(addPetForm, 'flex flex-col')

//Name
//Label
const addPetNameLabel = createLabel()
setTextContent(addPetNameLabel, 'Name')
setFor(addPetNameLabel, 'name')
addChild(addPetForm, addPetNameLabel)

//Input
const addPetNameInput = createInput()
setId(addPetNameInput, 'name')
setType(addPetNameInput, 'text')
setClass(addPetNameInput, 'border px-1')
addChild(addPetForm, addPetNameInput)

//Birth of Date
//Label
const addPetBirthdateLabel = createLabel()
setTextContent(addPetBirthdateLabel, 'Date of Birth')
setFor(addPetBirthdateLabel, 'date')
addChild(addPetForm, addPetBirthdateLabel)


//Input
const addPetBirthdateInput = createInput()
setId(addPetBirthdateInput, 'date')
setType(addPetBirthdateInput, 'date')
setClass(addPetBirthdateInput, 'border px-1')
addChild(addPetForm, addPetBirthdateInput)

// Weight
// Label
const addPetWeightLabel = createLabel()
setTextContent(addPetWeightLabel, 'Weight (kg)')
setFor(addPetWeightLabel, 'weight')
addChild(addPetForm, addPetWeightLabel)

//Input
const addPetWeightInput = createInput()
setId(addPetWeightInput, 'weight')
setType(addPetWeightInput, 'number')
addPetWeightInput.step = "0.01";
setClass(addPetWeightInput, 'border px-1')
addChild(addPetForm, addPetWeightInput)

//Image
//Label
const addPetImageLabel = createLabel()
setFor(addPetImageLabel, 'image')
setTextContent(addPetImageLabel, 'Image')
addChild(addPetForm, addPetImageLabel)

//Input
const addPetImageInput = document.createElement("input");
addPetImageInput.id = "image";
addPetImageInput.type = "url";
addPetImageInput.className = "border px-1";
addPetForm.appendChild(addPetImageInput);

// Button
const addPetSubmitButton = createButton()
setTextContent(addPetSubmitButton, 'Add Pet')
setType(addPetSubmitButton, 'submit')

addPetSubmitButton.className = "bg-black text-white self-center px-1 mt-4";
addChild(addPetForm,addPetSubmitButton)
addChild(addPetView, addPetForm)

addPetForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = addPetNameInput.value;
  const birthdate = addPetBirthdateInput.value;
  const weight = parseFloat(addPetWeightInput.value);
  const image = addPetImageInput.value;

  try {
    logic.addPet(name, birthdate, weight, image);

    addPetForm.reset();
    addPetFeedback.textContent = "";

    addPetView.style.display = "none";
    homeView.style.display = "";
    
    const pets = logic.getPets();

    clearPetList();
    renderPetList(pets);
  } catch (error) {
    addPetFeedback.textContent = error.message;
  }
});

const addPetFeedback = document.createElement("p");
addPetView.appendChild(addPetFeedback);

addChild(document.body, addPetView)
