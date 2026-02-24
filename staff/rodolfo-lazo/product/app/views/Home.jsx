import { useState, useEffect } from 'react'

import { Anchor } from './components/commons/Anchor'
import { Button } from './components/commons/Button'
import { Feedback } from './components/commons/Feedback'
import { Spinner } from './components/Spinner'

import { PetList } from './components/PetList'

import { logic } from '../logic'

export function Home({ onGoToAddPet, onUserLoggedOut, onGoToProfile, onGoToPetDetail }) {
    console.log('Home -> call')

    const [feedback, setFeedback] = useState(null)
    const [name, setName] = useState(null)
    const [image, setImage] = useState('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dWF6c2VwcTFwaWdtNXRoZm9mZXltaWVnaGZmNnI3NTU5M3hndGNsMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4X0i61SrJIyPe/giphy.gif')

    useEffect(() => {
        console.log('Home -> useEffect')

        setTimeout(() => {
            try {
                logic.getLoggedInUser()
                    .then(user => {
                        setName(user.name)
                        setImage(user.image || image)
                    })
                    .catch(error => setFeedback({ message: error.message, level: 'error' }))
            } catch (error) {
                setFeedback({ message: error.message, level: 'error' })
            }
        }, 1000)
    }, [])

    const handleAddPetClick = event => {
        event.preventDefault()

        onGoToAddPet()
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        try {
            logic.logoutUser()

            onUserLoggedOut()
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

        {name ? <>
            <h2 className="font-bold flex gap-2 items-center">Hello, {name}! <img className="rounded-full w-10 h-10 object-cover" src={image} /></h2>

            <div className="flex justify-between">
                <Anchor onClick={handleAddPetClick}>+ Pet</Anchor>

                <Anchor onClick={handleProfileClick}>Profile</Anchor>

                <Button type="button" onClick={handleLogoutClick}>Logout</Button>
            </div>

            <PetList onGoToPetDetail={handleGoToPetDetail} />

            {feedback && <Feedback feedback={feedback} />}
        </> : <Spinner />}
    </div>
} 