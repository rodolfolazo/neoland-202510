const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)

const { useState, useRef } = React


function App() {
    console.log('App -> call')

    const [view, setView] = useState('landing')
    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')

    const loginFormRef = useRef()
    const registerFormRef = useRef()

    const handleLoginClick = event => {
        event.preventDefault()

        if (registerFormRef.current)
            registerFormRef.current.reset()

        setView('login')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        if (loginFormRef.current)
            loginFormRef.current.reset()

        setView('register')
        setMessage('')
        setPasswordType('password')
        setPasswordRepeatType('password')
    }

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)

            form.reset()

            setView('home')
            setMessage('')
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            setView('login')
            setMessage('')
        } catch (error) {
            setMessage(message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }

    console.log('App -> render')

    // landing
    if (view === 'landing')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>
            <p>Welcome!</p>

            <nav>
                <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a> or <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>
            </nav>
        </div>

    // login
    if (view === 'login')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Login</h2>

            <form className="flex flex-col" onSubmit={handleLoginSubmit} ref={loginFormRef}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off"  type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

                <button className="bg-black text-white px-1 self-center" type="submit">Login</button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

            <p>{message}</p>
        </div>

    // register
    if (view === 'register')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Register</h2>

            <form className="flex flex-col" onSubmit={handleRegisterSubmit} ref={registerFormRef}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" type="text" className="border px-1" />

                <label htmlFor="email">Email</label>
                <input id="email" name="email" autoComplete="email" type="email" className="border px-1" />

                <label htmlFor="username">Username</label>
                <input id="username" name="username" autoComplete="username" type="text" className="border px-1" />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" autoComplete="off" type={passwordType} className={passwordType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'Show' : 'Hide'}</button>

                <label htmlFor="passwordRepeat">Repeat Password</label>
                <input id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} className={passwordRepeatType === 'password' ? 'border px-1' : 'border px-1 bg-[gold]'} />
                <button className="self-end" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password' ? 'Show' : 'Hide'}</button>

                <button className="bg-black text-white px-1 self-center" type="submit">Register</button>
            </form>

            <a className="cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p>{message}</p>
        </div>

    // home
    if (view === 'home')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <h2 className="font-bold">Welcome Home!</h2>

            <div className="flex justify-between">
                <button className="bg-black text-white px-1" type="button">+ Pet</button>
                <button className="bg-black text-white px-1" type="button">Logout</button>
            </div>

            <ul className="flex flex-col gap-2 mt-2">
                <li className="flex items-center border-2 border-black p-2 justify-between">
                    <div className="flex items-center gap-4">
                        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHQ3b2NjNDE3aW1rZGUwYTJsaXI4dzV6aGI5cGk0NmE4aGJ2cmhoMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lNLqexL939DTyR0uH2/giphy.gif" className="rounded-full w-10 h-10 object-cover" />

                        <p>Osito</p>
                    </div>
                    <button className="bg-black text-white px-1 justify-self-end">🗑️</button>
                </li>
            </ul>

            <div className="w-full h-full fixed top-0 left-0 bg-black/75 flex justify-center items-center" style={{ display: 'none' }}>
                <div className="bg-white border-black border-2 p-2">
                    <p className="text-center">Delete Pet?</p>

                    <div className="flex justify-center gap-2">
                        <button className="bg-black text-white px-1">❌</button> <button className="bg-black text-white px-1">✅</button>
                    </div>
                </div>
            </div>

            <p></p>
        </div>

    // add pet
    if (view === 'add-pet')
        return <div className="p-4">
            <h1 className="font-bold text-xl">MyPet</h1>

            <div className="flex justify-between">
                <h2 className="font-bold">Add Pet</h2>

                <a className="cursor-pointer underline font-bold">&lt; Back</a>
            </div>

            <form className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" className="border px-1" />

                <label htmlFor="date">Date of Birth</label>
                <input id="date" type="date" className="border px-1" />

                <label htmlFor="weight">Weight (kg)</label>
                <input id="weight" type="number" step="0.01" className="border px-1" />

                <label htmlFor="image">Image</label>
                <input id="image" type="url" className="border px-1" />

                <button className="bg-black text-white px-1 self-center mt-4" type="submit">Add Pet</button>
            </form>

            <p></p>
        </div>
}