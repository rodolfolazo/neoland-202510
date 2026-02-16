import { data } from './data'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const PET_ID_REGEX = /^\pet-[0-9]+$/

class Logic {
    constructor() {
    }

    registerUser(name, email, username, password, passwordRepeat) {
        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid email format')

        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof passwordRepeat !== 'string') throw new Error('invalid passwordRepeat type')
        if (passwordRepeat.length < 8) throw new Error('invalid passwordRepeat length')

        if (password !== passwordRepeat) throw new Error('passwords do not match')

        return fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, username, password, passwordRepeat })
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    loginUser(username, password) {
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        return fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 200)
                    return res.json()
                        .then(userId => {
                            debugger
                            data.setLoggedInUserId(userId)
                        })

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    logoutUser() {
        data.setLoggedInUserId(null)
    }

    changeUserEmail(email, newEmail, newEmailRepeat) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof email !== 'string') throw new Error('invalid email type')
        if (email.length < 6) throw new Error('invalid email length')
        if (!EMAIL_REGEX.test(email)) throw new Error('invalid email format')

        if (typeof newEmail !== 'string') throw new Error('invalid newEmail type')
        if (newEmail.length < 6) throw new Error('invalid newEmail length')
        if (!EMAIL_REGEX.test(newEmail)) throw new Error('invalid newEmail format')

        if (typeof newEmailRepeat !== 'string') throw new Error('invalid newEmailRepeat type')
        if (newEmailRepeat.length < 6) throw new Error('invalid newEmailRepeat length')
        if (!EMAIL_REGEX.test(newEmailRepeat)) throw new Error('invalid newEmailRepeat format')

        if (newEmail !== newEmailRepeat) throw new Error('newEmail and newEmailRepeat do not match')

        return fetch('http://localhost:8080/users/email', {
            method: 'PATCH',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newEmail, newEmailRepeat })
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    changeUserPassword(password, newPassword, newPasswordRepeat) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof newPassword !== 'string') throw new Error('invalid newPassword type')
        if (newPassword.length < 8) throw new Error('invalid newPassword length')

        if (typeof newPasswordRepeat !== 'string') throw new Error('invalid newPasswordRepeat type')
        if (newPasswordRepeat.length < 8) throw new Error('invalid newPasswordRepeat length')

        if (newPassword !== newPasswordRepeat) throw new Error('newPassword and newPasswordRepeat do not match')

        return fetch('http://localhost:8080/users/password', {
            method: 'PATCH',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, newPassword, newPasswordRepeat })
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    addPet(name, birthdate, weight, image) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')

        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')

        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        return fetch('http://localhost:8080/pets', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthdate, weight, image })
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 201)
                    return

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    getPets() {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        return fetch('http://localhost:8080/pets', {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId()
            }
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 200)
                    return res.json()
                        .then(pets => {
                            debugger
                            return pets
                        })

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        throw new Error(message)
                    })
            })
    }

    deletePet(petId) {
        if (data.getLoggedInUserId() === null) throw new Error('user not logged in')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')

        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        return fetch('http://localhost:8080/pets/' + petId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Basic ' + data.getLoggedInUserId()
            }
        })
            .then(res => {
                debugger
                const { status } = res

                if (status === 204)
                    return

                return res.json()
                    .then(body => {
                        debugger
                        const { error, message } = body

                        console.error(error, message)
                    })
            })
    }
}

// instance

export const logic = new Logic()
