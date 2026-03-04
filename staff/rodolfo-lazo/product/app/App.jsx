import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Home } from './views/Home'
import { AddPet } from './views/AddPet'
import { Profile } from './views/Profile'
import { PetDetail } from './views/PetDetail'
import { ModifyPet } from './views/ModifyPet'
import { Feedback } from './views/components/commons/Feedback'

import { logic } from './logic'

export function App() {
    console.log('App -> call')

    const [feedback, setFeedback] = useState(null)
    let loggedIn = false

    const navigate = useNavigate()

    try {
        loggedIn = logic.isUserLoggedIn()
    } catch (error) {
        setFeedback({ message: error.message, level: 'error' })
    }

    const handleGoToLogin = () => navigate('/login')

    const handleGoToRegister = () => navigate('/register')

    const handleGoToHome = () => navigate('/')

    const handleGoToAddPet = () => navigate('/add-pet')

    const handleGoToProfile = () => navigate('/profile')

    const handleGoToPetDetail = petId => navigate(`/pets/${petId}/detail`)

    const handleGoToModifyPet = petId => navigate(`/pets/${petId}/edit`)

    console.log('App -> render')

    return <>
        <Routes>
            <Route path="/" element={!loggedIn ?
                <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />
                :
                <Home onGoToAddPet={handleGoToAddPet} onUserLoggedOut={handleGoToLogin} onGoToProfile={handleGoToProfile} onGoToPetDetail={handleGoToPetDetail} />
            } />

            <Route path="/login" element={!loggedIn ? <Login onUserLoggedIn={handleGoToHome} onGoToRegister={handleGoToRegister} /> : <Navigate to="/" />} />

            <Route path="/register" element={!loggedIn ? <Register onGoToLogin={handleGoToLogin} /> : <Navigate to="/" />} />

            <Route path="/add-pet" element={loggedIn ? <AddPet onGoToHome={handleGoToHome} /> : <Navigate to="/login" />} />

            <Route path="/profile" element={loggedIn ? <Profile onGoToHome={handleGoToHome} /> : <Navigate to="/login" />} />

            <Route path="/pets/:petId/detail" element={loggedIn ? <PetDetail onGoToHome={handleGoToHome} onGoToModifyPet={handleGoToModifyPet} /> : <Navigate to="/login" />} />

            <Route path="/pets/:petId/edit" element={loggedIn ? <ModifyPet onGoBack={handleGoToPetDetail} /> : <Navigate to="/login" />} />
        </Routes>

        {feedback && <Feedback feedback={feedback} />}
    </>
}