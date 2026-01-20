const landingView = createView()
// hideView(landingView)

const landingTitle = createTitle()
setTextContent(landingTitle, 'MyPet')
addChild(landingView, landingTitle)

const landingWelcome = createParagraph()
setTextContent(landingWelcome, 'Welcome!')
addChild(landingView, landingWelcome)

const landingNavigation = createNavigation()

const landingLoginLink = createLink()
setTextContent(landingLoginLink, 'Login')
addChild(landingNavigation, landingLoginLink)

const landingOrText = createTextNode(' or ')
addChild(landingNavigation, landingOrText)

const landingRegisterLink = createLink()
setTextContent(landingRegisterLink, 'Register')
addChild(landingNavigation, landingRegisterLink)

addChild(landingView, landingNavigation)

landingLoginLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(loginView)
})

landingRegisterLink.addEventListener('click', function (event) {
    event.preventDefault()

    hideView(landingView)
    showView(registerView)
})

addChild(document.body, landingView)
