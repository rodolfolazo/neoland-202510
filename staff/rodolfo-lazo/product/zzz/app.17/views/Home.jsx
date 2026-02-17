import { useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'
import { Feedback } from './components/commons/Feedback'

import { PetList } from './components/PetList'

import { logic } from '../logic'

export function Home({ onGoToAddPet, onGoToLogin, onGoToProfile, onGoToPetDetail }) {
    console.log('Home -> call')

    const [feedback, setFeedback] = useState(null) // { message, level }

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            setFeedback(null)

            onGoToLogin()
        } catch (error) {
            setFeedback({ message: 'sorry, there was an error on logout, please, try it later', level: 'error' })
        }
    }

    const handleProfileClick = event => {
        event.preventDefault()

        onGoToProfile()
    }

    const handleGoToPetDetail = petId => onGoToPetDetail(petId)

    console.log('Home -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Welcome, Home!</h2>

        <div className="flex justify-between">
            <Anchor onClick={handleAddPetClick}>+ Pet</Anchor>

            <Anchor onClick={handleProfileClick}>Profile</Anchor>

            <Button type="button" onClick={handleLogoutClick}>Logout</Button>
        </div>

        <PetList onGoToPetDetail={handleGoToPetDetail} />

        {feedback && <Feedback feedback={feedback} />}
    </div>
} 