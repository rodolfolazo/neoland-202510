import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'

import { logic } from '../logic'
import { CredentialError, ExistenceError, ValidationError } from '../errors'

export function Login({ onUserLoggedIn, onGoToRegister }) {
    console.log('Login -> call')

    const [feedback, setFeedback] = useState(null)

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    if (error instanceof ValidationError)
                        setFeedback({ message: error.message, level: 'warn' })
                    else if (error instanceof ExistenceError || error instanceof CredentialError)
                        setFeedback({ message: error.message, level: 'danger' })
                    else
                        setFeedback({ message: 'sorry, something failed. try again later', level: 'error' })
                })
        } catch (error) {
            if (error instanceof ValidationError)
                setFeedback({ message: error.message, level: 'warn' })
            else
                setFeedback({ message: 'sorry, something failed. try again later', level: 'error' })
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }

    console.log('Login -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Login</h2>

        <Form onSubmit={handleLoginSubmit}>
            <Field alias="username" type="text">Username</Field>

            <PasswordField alias="password">Password</PasswordField>

            <Button className="self-center" type="submit">Login</Button>
        </Form>

        <Anchor onClick={handleRegisterClick}>Register</Anchor>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}