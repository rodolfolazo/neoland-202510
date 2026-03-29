import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'

import { logic } from '../../logic'

export function ChangeUserUsername({ onError, onSuccess }) {
    console.log('ChangeUserUsername -> call')

    const [username, setUsername] = useState('')

    useEffect(() => {
        try {
            logic.getLoggedInUser()
                .then(user => setUsername(user.username))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleChangeNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value

        try {
            logic.changeUserUsername(username)
                .then(() => onSuccess('username successfully updated'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserUsername -> render')

    return <div>
        <Form onSubmit={handleChangeNameSubmit}>
            <Field alias="username" type="text" defaultValue={username}>Username</Field>

            <Button className="self-center mt-4" type="submit">Update username</Button>
        </Form>
    </div>
}