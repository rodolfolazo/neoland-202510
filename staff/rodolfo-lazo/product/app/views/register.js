// register

const registerView = createView()
hideView(registerView)

const registerTitle = createTitle()
setTextContent(registerTitle, 'MyPet')
setClass(registerTitle, 'font-bold text-xl')
addChild(registerView, registerTitle)

const registerSubtitle = createSubtitle()
setTextContent(registerSubtitle, 'Register')
setClass(registerSubtitle, 'font-bold')
addChild(registerView, registerSubtitle)

const registerForm = createForm()
setClass(registerForm, 'flex flex-col')

const registerNameLabel = createLabel()
setTextContent(registerNameLabel, 'Name')
setFor(registerNameLabel, 'registerName')
addChild(registerForm, registerNameLabel)

const registerNameInput = createInput()
setId(registerNameInput, 'registerName')
setType(registerNameInput, 'text')
setClass(registerNameInput, 'border px-1')
addChild(registerForm, registerNameInput)

const registerEmailLabel = createLabel()
setTextContent(registerEmailLabel, 'Email')
setFor(registerEmailLabel, 'email')
addChild(registerForm, registerEmailLabel)

const registerEmailInput = createInput()
setId(registerEmailInput, 'email')
setType(registerEmailInput, 'email')
setClass(registerEmailInput, 'border px-1')
addChild(registerForm, registerEmailInput)

const registerUsernameLabel = createLabel()
setTextContent(registerUsernameLabel, 'Username')
setFor(registerUsernameLabel, 'registerUsername')
addChild(registerForm, registerUsernameLabel)

const registerUsernameInput = createInput()
setId(registerUsernameInput, 'registerUsername')
setType(registerUsernameInput, 'text')
setClass(registerUsernameInput, 'border px-1')
addChild(registerForm, registerUsernameInput)

const registerPasswordLabel = createLabel()
setFor(registerPasswordLabel, 'registerPassword')
setTextContent(registerPasswordLabel, 'Password')
addChild(registerForm, registerPasswordLabel)

const registerPasswordInput = createInput()
setId(registerPasswordInput, 'registerPassword')
setType(registerPasswordInput, 'password')
setClass(registerPasswordInput, 'border px-1')
addChild(registerForm, registerPasswordInput)

const registerShowPasswordButton = createButton()
setTextContent(registerShowPasswordButton, 'Show')
setType(registerShowPasswordButton, 'button')
setClass(registerShowPasswordButton, 'self-end')
addChild(registerForm,registerShowPasswordButton)


registerShowPasswordButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (registerPasswordInput.type === "password") {
    setType(registerPasswordInput, 'text')
    setTextContent(registerShowPasswordButton, 'Hide')
    setClass(registerPasswordInput, 'border px-1 bg-[gold]')    
  } else {
    setType(registerPasswordInput, 'password')
    setTextContent(registerShowPasswordButton, 'Show')
    setClass(registerPasswordInput, 'border px-1')    
  }
});

const registerPasswordRepeatLabel = createLabel()
setTextContent(registerPasswordRepeatLabel, 'Repeat Password')
setFor(registerPasswordRepeatLabel, 'passwordRepeat')
addChild(registerForm, registerPasswordRepeatLabel)


const registerPasswordRepeatInput = createInput()
setId(registerPasswordRepeatInput, 'passwordRepeat')
setType(registerPasswordRepeatInput, 'password')
setClass(registerPasswordRepeatInput, 'border px-1')
addChild(registerForm, registerPasswordRepeatInput)


const registerShowPasswordRepeatButton = createButton();
setTextContent(registerShowPasswordRepeatButton, 'Show')
setType(registerShowPasswordRepeatButton, 'button')
setClass(registerShowPasswordRepeatButton, 'self-end')
addChild(registerForm,registerShowPasswordRepeatButton)

registerShowPasswordRepeatButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (registerPasswordRepeatInput.type === "password") {    
    setType(registerPasswordRepeatInput, 'text')
    setTextContent(registerShowPasswordRepeatButton,'Hide')
    setClass(registerPasswordRepeatInput, 'border px-1 bg-[gold]')    
  } else {
    setType(registerPasswordRepeatInput, 'password')
    setTextContent(registerShowPasswordRepeatButton, 'Show')
    setClass(registerShowPasswordRepeatButton, 'border px-1')    
  }
});

const registerSubmitButton = document.createElement("button");
setTextContent(registerSubmitButton, 'Register')
setType(registerSubmitButton, 'submit')
setClass(registerSubmitButton, 'bg-black text-white self-center px-1')
addChild(registerForm, registerSubmitButton)
addChild(registerView, registerForm)

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
    setTextContent(registerFeedback, '')
    
    hideView(registerView)    
    showView(loginView)
  } catch (error) {
    registerFeedback.textContent = error.message;
  }
});

const registerLoginLink = createLink()
setTextContent(registerLoginLink, 'Login')
setHref(registerLoginLink, '')
setClass(registerLoginLink, 'underline font-bold')
addChild(registerView, registerLoginLink)

registerLoginLink.addEventListener("click", function (event) {
  event.preventDefault();
  
  hideView(registerView)
  showView(loginView)
});

const registerFeedback = createParagraph()
addChild(registerView, registerFeedback)

addChild(document.body, registerView)