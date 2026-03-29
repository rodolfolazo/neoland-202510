import { data } from './data'
import { validate } from './validate'
import { SystemError, AuthError, errorMap } from './errors'

class Logic {
    constructor() {
    }

    registerUser(name, email, username, password, passwordRepeat) {
        validate.name(name)
        validate.email(email)
        validate.username(username)
        validate.password(password)
        validate.password(passwordRepeat, 'passwordRepeat')
        validate.match(password, passwordRepeat, 'password', 'passwordRepeat')

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
        validate.username(username)
        validate.password(password)

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
                        .catch(error => { throw new SystemError('json error') })
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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.email(email)
        validate.email(newEmail, 'newEmail')
        validate.email(newEmailRepeat, 'newEmailRepeat')
        validate.match(newEmail, newEmailRepeat, 'newEmail', 'newEmailRepeat')

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.password(password)
        validate.password(newPassword, 'newPassword')
        validate.password(newPasswordRepeat, 'newPasswordRepeat')
        validate.match(newPassword, newPasswordRepeat, 'newPassword', 'newPasswordRepeat')

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

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
                        .catch(error => { throw new SystemError('json error') })
                        .then(user => user)

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.url(image, 'image')

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

    changeUserName(name) {
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.name(name)

        return fetch('http://localhost:8080/users/me/name', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
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

    changeUserUsername(username) {
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.username(username)

        return fetch('http://localhost:8080/users/me/username', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${data.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

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
                        .catch(error => { throw new SystemError('json error') })
                        .then(pets => pets)

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.id(petId, 'petId')

        return fetch(`http://localhost:8080/pets/${petId}`, {
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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.id(petId, 'petId')

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
                        .catch(error => { throw new SystemError('json error') })
                        .then(pet => pet)

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
        if (data.getToken() === null) throw new AuthError('user not logged in')

        validate.id(petId, 'petId')
        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

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
