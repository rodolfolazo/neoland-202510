import { useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserImage } from './components/ChangeUserImage'

export function Profile({ onGoToHome, onError, onSuccess, onClear }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        onClear()
        setView('change-email')
    }

    const handlePasswordClick = event => {
        event.preventDefault()

        onClear()
        setView('change-password')
    }

    const handleImageClick = event => {
        event.preventDefault()

        onClear()
        setView('change-image')
    }

    console.log('Profile -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <div className="flex justify-between">
            <h2 className="font-bold">Profile</h2>

            <Anchor onClick={handleBackClick}>&lt; Back</Anchor>
        </div>

        <ul>
            <li><Anchor onClick={handleChangeEmailClick}>Change e-mail</Anchor></li>
            <li><Anchor onClick={handlePasswordClick}>Change password</Anchor></li>
            <li><Anchor onClick={handleImageClick}>Change image</Anchor></li>
        </ul>

        {view === 'change-email' && <ChangeUserEmail onError={onError} onSuccess={onSuccess} />}

        {view === 'change-password' && <ChangeUserPassword onError={onError} onSuccess={onSuccess} />}

        {view === 'change-image' && <ChangeUserImage onError={onError} onSuccess={onSuccess} />}
    </div>
}