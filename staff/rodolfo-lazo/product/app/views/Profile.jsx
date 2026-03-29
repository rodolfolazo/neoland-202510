import { useState } from 'react'

import { Anchor } from './components/commons/Anchor'
import { ChangeUserEmail } from './components/ChangeUserEmail'
import { ChangeUserPassword } from './components/ChangeUserPassword'
import { ChangeUserImage } from './components/ChangeUserImage'
import { ChangeUserName } from './components/ChangeUserName'
import { ChangeUserUsername } from './components/ChangeUserUsername'

export function Profile({ onGoToHome, onError, onSuccess, onClear }) {
    console.log('Profile -> call')

    const [view, setView] = useState(null)

    const handleBackClick = event => {
        event.preventDefault()

        onGoToHome()
    }

    const handleChangeNameClick = event => {
        event.preventDefault()

        onClear()
        setView('change-name')
    }

    const handleChangeEmailClick = event => {
        event.preventDefault()

        onClear()
        setView('change-email')
    }

    const handleChangeUsernameClick = event => {
        event.preventDefault()

        onClear()
        setView('change-username')
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
            <li><Anchor onClick={handleChangeNameClick}>Change name</Anchor></li>
            <li><Anchor onClick={handleChangeEmailClick}>Change e-mail</Anchor></li>
            <li><Anchor onClick={handleChangeUsernameClick}>Change username</Anchor></li>
            <li><Anchor onClick={handlePasswordClick}>Change password</Anchor></li>
            <li><Anchor onClick={handleImageClick}>Change image</Anchor></li>
        </ul>

        {view === 'change-name' && <ChangeUserName onError={onError} onSuccess={onSuccess} />}

        {view === 'change-email' && <ChangeUserEmail onError={onError} onSuccess={onSuccess} />}

        {view === 'change-username' && <ChangeUserUsername onError={onError} onSuccess={onSuccess} />}

        {view === 'change-password' && <ChangeUserPassword onError={onError} onSuccess={onSuccess} />}

        {view === 'change-image' && <ChangeUserImage onError={onError} onSuccess={onSuccess} />}
    </div>
}