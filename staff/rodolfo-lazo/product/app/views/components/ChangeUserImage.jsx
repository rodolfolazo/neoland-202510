import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'

import { logic } from '../../logic'

export function ChangeUserImage({ onError, onSuccess }) {
    console.log('ChangeUserImage -> call')

    const [image, setImage] = useState('')

    useEffect(() => {
        try {
            logic.getLoggedInUser()
                .then(user => setImage(user.image))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleChangeImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value

        try {
            logic.changeUserImage(image)
                .then(() => onSuccess('user image successfully updated'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserImage -> render')

    return <div>
        <Form onSubmit={handleChangeImageSubmit}>
            <Field alias="image" type="url" defaultValue={image}>Image</Field>

            <Button className="self-center mt-4" type="submit">Update image</Button>
        </Form>
    </div>
}