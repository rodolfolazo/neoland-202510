import { useState } from 'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { Button } from './components/commons/Button'
import { Anchor } from './components/commons/Anchor'
import { Feedback } from './components/commons/Feedback'

import { logic } from '../logic'
import { DuplicityError, ValidationError } from '../errors'

export function Register({ onGoToLogin }) {
    console.log('Register -> call')

    const [feedback, setFeedback] = useState(null)

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    setFeedback(null)

                    onGoToLogin()
                })
                .catch(error => {
                    if (error instanceof ValidationError)
                        setFeedback({ message: error.message, level: 'warn' })
                    else if (error instanceof DuplicityError)
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

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    console.log('Register -> render')

    return <div className="p-4">
        <h1 className="font-bold text-xl">MyPet</h1>

        <h2 className="font-bold">Register</h2>

        <Form onSubmit={handleRegisterSubmit}>
            <Field alias="name" type="text">Name</Field>

            <Field alias="email" type="email">E-mail</Field>

            <Field alias="username" type="text">Username</Field>

            <PasswordField alias="password">Password</PasswordField>

            <PasswordField alias="passwordRepeat">Repeat Password</PasswordField>

            <Button className="self-center" type="submit">Register</Button>
        </Form>

        <Anchor onClick={handleLoginClick}>Login</Anchor>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}