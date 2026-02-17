import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'

import { logic } from '../logic'

export function PetDetail({ onGoToHome, petId }) {
    console.log('PetDetail -> call')

    const [feedback, setFeedback] = useState(null) // { message, level }
    const [pet, setPet] = useState(null)

    useEffect(() => {
        try {
            logic.getPet(petId)
                .then(pet => setPet(pet))
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }, [])

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    console.log('PetDetail -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Pet</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        {pet && <div className="flex flex-col items-center gap-4">
            <img src={pet.image} className="rounded-full w-40 h-40 object-cover" />

            <p>{pet.name}</p>

            <p>{pet.weight}kg</p>

            <p>{pet.birthdate}</p>
        </div>}

        {feedback && <Feedback feedback={feedback} />}
    </div>
}