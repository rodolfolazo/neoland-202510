// landing

const landingView = createView()
// landingView.style.display = 'none'

const landingTitle = createTitle()
setTextContent(landingTitle, 'MyPet')
setClass(landingTitle,'font-bold text-xl')
addChild(landingView,landingTitle)

const landingWelcome = document.createElement("p");
setTextContent(landingWelcome, 'Welcome!')
setClass(landingWelcome,'mb-4')
addChild(landingView,landingWelcome)

const landingNavigation = createNavigation()
const landingLoginLink = createLink()
setTextContent(landingLoginLink,'Login')
setHref(landingLoginLink,'')
setClass(landingLoginLink,'underline font-bold')
addChild(landingNavigation,landingLoginLink)

const landingOrText = createTextNode(' or ')
addChild(landingNavigation,landingOrText)

const landingRegisterLink = createLink()
setTextContent(landingRegisterLink,'Register')
setHref(landingRegisterLink,'')
setClass(landingRegisterLink,'underline font-bold')
addChild(landingNavigation,landingRegisterLink)
addChild(landingView, landingNavigation)

landingLoginLink.addEventListener("click", function (event) {
  event.preventDefault();

  hideView(landingView)
  showView(loginView)  
});

landingRegisterLink.addEventListener("click", function (event) {
  event.preventDefault();
  
  hideView(landingView)
  showView(registerView)  
});


addChild(document.body, landingView)