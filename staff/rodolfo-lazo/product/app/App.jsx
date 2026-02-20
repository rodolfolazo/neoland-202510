import { useState } from 'react'

import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Home } from './views/Home'
import { AddPet } from './views/AddPet'
import { Profile } from './views/Profile'
import { PetDetail } from './views/PetDetail'
import { ModifyPet } from './views/ModifyPet'

export function App() {
    console.log('App -> call')

    const [view, setView] = useState('landing')
    const [petId, setPetId] = useState(null)

    const handleGoToLogin = () => setView('login')

    const handleGoToRegister = () => setView('register')

    const handleGoToHome = () => setView('home')

    const handleGoToAddPet = () => setView('add-pet')

    const handleGoToProfile = () => setView('profile')

    const handleGoToPetDetailById = petId => {
        setPetId(petId)
        
        handleGoToPetDetail()
    }

    const handleGoToPetDetail = () => setView('pet-detail')

    const handleGoToModifyPet = () => setView('modify-pet')

    console.log('App -> render')

    return <>
        {view === 'landing' && <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />}

        {view === 'login' && <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister} />}

        {view === 'register' && <Register onGoToLogin={handleGoToLogin} />}

        {view === 'home' && <Home onGoToAddPet={handleGoToAddPet} onGoToLogin={handleGoToLogin} onGoToProfile={handleGoToProfile} onGoToPetDetail={handleGoToPetDetailById} />}

        {view === 'add-pet' && <AddPet onGoToHome={handleGoToHome} />}

        {view === 'profile' && <Profile onGoToHome={handleGoToHome} />}

        {view === 'pet-detail' && <PetDetail petId={petId} onGoToHome={handleGoToHome} onGoToModifyPet={handleGoToModifyPet} />}

        {view === 'modify-pet' && <ModifyPet petId={petId} onGoBack={handleGoToPetDetail} />}
    </>
}