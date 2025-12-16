const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// landing

const landingTitle = React.createElement('h1', { children: 'MyPet' })

const landingWelcome = React.createElement('p', { children: 'Welcome!' })

const landingLoginLink = React.createElement('a', { href: '', children: 'Login' })
const landingRegisterLink = React.createElement('a', { href: '', children: 'Register' })

const landingNavigation = React.createElement('nav', null, [landingLoginLink, ' or ', landingRegisterLink])

const landingView = React.createElement('div', null, [landingTitle, landingWelcome, landingNavigation])

root.render(landingView)