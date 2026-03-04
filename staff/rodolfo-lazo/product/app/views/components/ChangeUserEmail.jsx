import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'

import { logic } from '../../logic'

export function ChangeUserEmail({ onError, onSuccess }) {
    console.log('ChangeUserEmail -> call')

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

                    onSuccess('user e-mail successfully updated')
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
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
    </div>
}