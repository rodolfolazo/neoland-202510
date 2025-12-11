// login

const loginView = createView()
hideView(loginView)

const loginTitle = createTitle()
setTextContent(loginTitle, 'MyPet')
setClass(loginTitle, 'font-bold text-xl')
addChild(loginView, loginTitle)

const loginSubtitle = createSubtitle()
setTextContent(loginSubtitle, 'Login')
setClass(loginSubtitle,'font-bold mb-4')
addChild(loginView, loginSubtitle)

const loginForm = createForm()
setClass(loginForm, 'flex flex-col')
const loginUsernameLabel = document.createElement("label");
setTextContent(loginUsernameLabel,'Username')
setFor(loginUsernameLabel, 'username')
addChild(loginForm, loginUsernameLabel)

const loginUsernameInput = createInput()
setId(loginUsernameInput, 'username')
setType(loginUsernameInput, 'text')
setClass(loginUsernameInput, 'border px-1')
addChild(loginForm,loginUsernameInput)

const loginPasswordLabel = document.createElement("label");
loginPasswordLabel.textContent = "Password";
loginPasswordLabel.htmlFor = "password";
addChild(loginForm, loginPasswordLabel)

const loginPasswordInput = createInput()
setId(loginPasswordInput, 'password')
setType(loginPasswordInput, 'password')
setClass(loginPasswordInput, 'border px-1')
addChild(loginForm, loginPasswordInput)

const loginShowPasswordButton = createButton()
setTextContent(loginShowPasswordButton,'Show')
setType(loginShowPasswordButton, 'button')
setClass(loginShowPasswordButton,'self-end')
addChild(loginForm, loginShowPasswordButton)

loginShowPasswordButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (loginPasswordInput.type === "password") {
    setType(loginPasswordInput, 'text')
    setTextContent(loginShowPasswordButton, 'Hide')
    setClass(loginPasswordInput,'border px-1 bg-[gold]')    
  } else {
    setType(loginPasswordInput, 'password')
    setTextContent(loginShowPasswordButton, 'Show')
    setClass(loginPasswordInput, 'border px-1')        
  }
});

const loginSubmitButton = createButton()
setTextContent(loginSubmitButton, 'Login')
setType(loginSubmitButton, 'submit')
setClass(loginSubmitButton,'bg-black text-white px-1 self-center')
addChild(loginForm, loginSubmitButton)
addChild(loginView,loginForm)


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

    renderPetList(pets)    

    const userName = logic.getUserName()

    
    nameHome.textContent = `Hola ${userName}`;
    nameHome.className = "mb-2";    
    
    hideView(loginView)
    showView(homeView)    
  } catch (error) {
    loginFeedback.textContent = error.message;
  }
});

const loginRegisterLink = createLink()
setTextContent(loginRegisterLink, 'Register')
setHref(loginRegisterLink, '')
setClass(loginRegisterLink, 'underline font-bold')
addChild(loginView, loginRegisterLink)

loginRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();
  
  hideView(loginView)  
  showView(registerView)
});

const loginFeedback = createParagraph()

addChild(loginView, loginFeedback)
addChild(document.body, loginView)
