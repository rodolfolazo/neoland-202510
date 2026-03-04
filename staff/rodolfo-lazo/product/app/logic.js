import { data } from './data'

import { SystemError, ValidationError, errorMap } from './errors'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PET_ID_REGEX = /^\pet-[0-9]+$/

class Logic {
    constructor() {
    }

    registerUser(name, email, username, password, passwordRepeat) {
        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')

        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (email.length < 6) throw new ValidationError('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email format')

        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (username.length < 3) throw new ValidationError('invalid username length')

        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')

        if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid passwordRepeat type')
        if (passwordRepeat.length < 8) throw new ValidationError('invalid passwordRepeat length')

        if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

        return fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, username, password, passwordRepeat })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    loginUser(username, password) {
        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (username.length < 3) throw new ValidationError('invalid username length')

        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')

        return fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()
                        .then(token => data.setToken(token))

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    logoutUser() {
        data.removeToken()
    }

    isUserLoggedIn() {
        return !!data.getToken()
    }

    changeUserEmail(email, newEmail, newEmailRepeat) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (email.length < 6) throw new ValidationError('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email format')

        if (typeof newEmail !== 'string') throw new ValidationError('invalid newEmail type')
        if (newEmail.length < 6) throw new ValidationError('invalid newEmail length')
        if (!EMAIL_REGEX.test(newEmail)) throw new ValidationError('invalid newEmail format')

        if (typeof newEmailRepeat !== 'string') throw new ValidationError('invalid newEmailRepeat type')
        if (newEmailRepeat.length < 6) throw new ValidationError('invalid newEmailRepeat length')
        if (!EMAIL_REGEX.test(newEmailRepeat)) throw new ValidationError('invalid newEmailRepeat format')

        if (newEmail !== newEmailRepeat) throw new ValidationError('newEmail and newEmailRepeat do not match')

        return fetch('http://localhost:8080/users/me/email', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newEmail, newEmailRepeat })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    changeUserPassword(password, newPassword, newPasswordRepeat) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')

        if (typeof newPassword !== 'string') throw new ValidationError('invalid newPassword type')
        if (newPassword.length < 8) throw new ValidationError('invalid newPassword length')

        if (typeof newPasswordRepeat !== 'string') throw new ValidationError('invalid newPasswordRepeat type')
        if (newPasswordRepeat.length < 8) throw new ValidationError('invalid newPasswordRepeat length')

        if (newPassword !== newPasswordRepeat) throw new ValidationError('newPassword and newPasswordRepeat do not match')

        return fetch('http://localhost:8080/users/me/password', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, newPassword, newPasswordRepeat })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    getLoggedInUser() {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        return fetch('http://localhost:8080/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.getToken()}`
            }
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()
                // .then(user => user)

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    changeUserImage(image) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        return fetch('http://localhost:8080/users/me/image', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    addPet(name, birthdate, weight, image) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')

        if (typeof birthdate !== 'string') throw new ValidationError('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new ValidationError('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new ValidationError('invalid weight type')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')

        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        return fetch('http://localhost:8080/pets', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthdate, weight, image })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    getPets() {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        return fetch('http://localhost:8080/pets', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${data.getToken()}`
            }
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()
                // .then(pets => pets)

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    removePet(petId) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')

        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        return fetch('http://localhost:8080/pets/' + petId, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${data.getToken()}`
            }
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    getPet(petId) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        return fetch(`http://localhost:8080/pets/${petId}`, {
            headers: {
                Authorization: `Bearer ${data.getToken()}`
            }
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 200)
                    return res.json()

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }

    modifyPet(petId, name, birthdate, weight, image) {
        if (data.getToken() === null) throw new ValidationError('user not logged in')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')

        if (typeof birthdate !== 'string') throw new ValidationError('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new ValidationError('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new ValidationError('invalid weight type')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')

        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        return fetch(`http://localhost:8080/pets/${petId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthdate, weight, image })
        })
            .catch(error => { throw new SystemError('connection error') })
            .then(res => {
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errorMap[error] || SystemError

                        throw new constructor(message)
                    })
            })
    }
}

// instance

export const logic = new Logic()
