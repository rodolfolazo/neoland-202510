import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'
import { Button } from './components/commons/Button'

import { logic } from '../logic'

export function PetDetail({ onGoToHome, onGoToModifyPet }) {
    console.log('PetDetail -> call')

    const [feedback, setFeedback] = useState(null)
    const [pet, setPet] = useState(null)

    const { petId } = useParams()

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

    const handleGoToModifyPet = () => onGoToModifyPet(petId)

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

            <Button onClick={handleGoToModifyPet}>Modify</Button>
        </div>}

        {feedback && <Feedback feedback={feedback} />}
    </div>
}