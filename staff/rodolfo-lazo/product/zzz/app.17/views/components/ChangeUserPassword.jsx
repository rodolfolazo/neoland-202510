import { useState } from 'react'

import { Form } from './commons/Form'
import { PasswordField } from './commons/PasswordField'
import { Button } from './commons/Button'
import { Feedback } from './commons/Feedback'

import { logic } from '../../logic'

export function ChangeUserPassword() {
    console.log('ChangeUserPassword -> call')

        const [feedback, setFeedback] = useState(null) // { message, level }

    const handleChangePasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const password = form.password.value
        const newPassword = form.newPassword.value
        const newPasswordRepeat = form.newPasswordRepeat.value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordRepeat)
                .then(() => {
                    form.reset()

                    setFeedback({ message: 'user password successfully updated', level: 'success' })
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ChangeUserPassword -> render')

    return <div>
        <Form onSubmit={handleChangePasswordSubmit}>
            <PasswordField alias="password" type="password">Password</PasswordField>

            <PasswordField alias="newPassword" type="password">New password</PasswordField>

            <PasswordField alias="newPasswordRepeat" type="password">New password repeat</PasswordField>

            <Button className="self-center mt-4" type="submit">Update password</Button>
        </Form>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}