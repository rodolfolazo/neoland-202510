import { useState } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'

import { logic } from '../../logic'

export function ChangeUserEmail() {
    console.log('ChangeUserEmail -> call')

    const [message, setMessage] = useState('')
    const [level, setLevel] = useState('')

    const handleChangeEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const newEmail = form.newEmail.value
        const newEmailRepeat = form.newEmailRepeat.value

        try {
            logic.changeUserEmail(email, newEmail, newEmailRepeat)
                .then(() => {
                    form.reset()

                    setMessage('user e-mail successfully updated')
                    setLevel('success')
                })
                .catch(error => {
                    setMessage(error.message)
                    setLevel('error')
                })
        } catch (error) {
            setMessage(error.message)
            setLevel('error')
        }
    }

    console.log('ChangeUserEmail -> render')

    return <div>
        <Form onSubmit={handleChangeEmailSubmit}>
            <Field alias="email" type="email">E-mail</Field>

            <Field alias="newEmail" type="email">New e-mail</Field>

            <Field alias="newEmailRepeat" type="email">New e-mail repeat</Field>

            <Button className="self-center mt-4" type="submit">Update e-mail</Button>
        </Form>

        <p className={level === 'success' ? 'text-green-700' : level === 'error' ? 'text-red-600' : ''}>{message}</p>
    </div>
}