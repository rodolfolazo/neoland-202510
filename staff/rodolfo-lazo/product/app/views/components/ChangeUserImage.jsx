import { useState } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Button } from './commons/Button'
import { Feedback } from './commons/Feedback'

import { logic } from '../../logic'

export function ChangeUserImage() {
    console.log('ChangeUserImage -> call')

    const [feedback, setFeedback] = useState(null)

    const handleChangeImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value

        try {
            logic.changeUserImage(image)
                .then(() => {
                    form.reset()

                    setFeedback({ message: 'user image successfully updated', level: 'success' })
                })
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ChangeUserImage -> render')

    return <div>
        <Form onSubmit={handleChangeImageSubmit}>
            <Field alias="image" type="url">Image</Field>

            <Button className="self-center mt-4" type="submit">Update image</Button>
        </Form>

        {feedback && <Feedback feedback={feedback} />}
    </div>
}