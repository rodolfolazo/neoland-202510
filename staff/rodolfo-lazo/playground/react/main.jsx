const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// landing

function LandingView() {
    return <div>
        <h1>MyPet</h1>

        <p>Welcome!</p>

        <nav>
            <a href="">Login</a> or <a href="">Register</a>
        </nav>
    </div>
}

root.render(<LandingView />)