import bcrypt from 'bcryptjs'

import { data, UserData, PetData } from './data.js'
import { validate } from './validate.js'

import { DuplicityError, ExistenceError, CredentialError, OwnershipError, SystemError } from './errors.js'

class User {
    constructor(id, name, email, username, image, role) {
        this.id = id
        this.name = name
        this.email = email
        this.username = username
        this.image = image
        this.role = role
    }
}

class Pet {
    constructor(id, ownerId, name, birthdate, weight, image) {
        this.id = id
        this.ownerId = ownerId
        this.name = name
        this.birthdate = birthdate
        this.weight = weight
        this.image = image
    }
}

class Logic {
    registerUser(name, email, username, password, passwordRepeat) {
        validate.name(name)
        validate.email(email)
        validate.username(username)
        validate.password(password)
        validate.password(passwordRepeat, 'passwordRepeat')
        validate.match(password, passwordRepeat, 'password', 'passwordRepeat')

        return data.findUserByEmail(email)
            .then(userData => {
                if (userData !== null) throw new DuplicityError('user email already exists')

                return data.findUserByUsername(username)
            })
            .then(userData => {
                if (userData !== null) throw new DuplicityError('user username already exists')

                return bcrypt.hash(password, 10)
                    .catch(error => { throw new SystemError(error.message) })
            })
            .then(hash => {
                const userData = new UserData(null, name, email, username, hash, null, 'regular')

                return data.insertUser(userData)
            })
    }

    authenticateUser(username, password) {
        validate.username(username)
        validate.password(password)

        return data.findUserByUsername(username)
            .then(userData => {
                if (userData === null) throw new ExistenceError('user not found')

                return bcrypt.compare(password, userData.password)
                    .catch(error => { throw new SystemError(error.message) })
                    .then(match => {
                        if (!match) throw new CredentialError('incorrect password')

                        return userData.id
                    })
            })
    }

    changeUserEmail(userId, email, newEmail, newEmailRepeat) {
        validate.id(userId, 'userId')
        validate.email(email)
        validate.email(newEmail, 'newEmail')
        validate.email(newEmailRepeat, 'newEmailRepeat')
        validate.match(newEmail, newEmailRepeat, 'newEmail', 'newEmailRepeat')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                if (userData.email !== email) throw new OwnershipError('email does not belong to user')

                return data.findUserByEmail(newEmail)
                    .then(otherUserData => {
                        if (otherUserData) throw new OwnershipError('newEmail belongs to another user')

                        const { name, username, password, image, role } = userData

                        return data.updateUser(new UserData(userId, name, newEmail, username, password, image, role))
                    })
            })
    }

    changeUserPassword(userId, password, newPassword, newPasswordRepeat) {
        validate.id(userId, 'userId')
        validate.password(password)
        validate.password(newPassword, 'newPassword')
        validate.password(newPasswordRepeat, 'newPasswordRepeat')
        validate.match(newPassword, newPasswordRepeat, 'newPassword', 'newPasswordRepeat')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                return bcrypt.compare(password, userData.password)
                    .catch(error => { throw new SystemError(error.message) })
                    .then(match => {
                        if (!match) throw new CredentialError('incorrect password')

                        return bcrypt.hash(newPassword, 10)
                            .catch(error => { throw new SystemError(error.message) })
                            .then(newHash => {
                                const { name, email, username, image, role } = userData
        
                                return data.updateUser(new UserData(userId, name, email, username, newHash, image, role))
                            })
                    })
            })
    }

    getUser(userId) {
        validate.id(userId, 'userId')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                const { name, email, username, image, role } = userData

                return new User(userId, name, email, username, image, role)
            })
    }

    changeUserImage(userId, image) {
        validate.id(userId, 'userId')
        validate.url(image, 'image')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                const { name, email, username, password, role } = userData

                return data.updateUser(new UserData(userId, name, email, username, password, image, role))
            })
    }

    changeUserName(userId, name) {
        validate.id(userId, 'userId')
        validate.name(name)

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                const { email, username, password, image, role } = userData

                return data.updateUser(new UserData(userId, name, email, username, password, image, role))
            })
    }

    changeUserUsername(userId, username) {
        validate.id(userId, 'userId')
        validate.username(username)

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                const { name, email, password, image, role } = userData

                return data.updateUser(new UserData(userId, name, email, username, password, image, role))
            })
    }

    addPet(userId, name, birthdate, weight, image) {
        validate.id(userId, 'userId')
        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

        return data.findUserById(userId)
            .then(user => {
                if (!user) throw new ExistenceError('user not found')

                const pet = new PetData(null, userId, name, birthdate, weight, image)

                return data.insertPet(pet)
            })
    }

    getPets(userId) {
        validate.id(userId, 'userId')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new Error('user not found')

                return data.findPetsByUserId(userId)
            })
            .then(petDatas => petDatas.map(petData => {
                const { id, ownerId, name, birthdate, weight, image } = petData

                return new Pet(id, ownerId, name, birthdate, weight, image)
            }))
    }

    removePet(userId, petId) {
        validate.id(userId, 'userId')
        validate.id(petId, 'petId')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                return data.findPetById(petId)
            })
            .then(petData => {
                if (!petData) throw new ExistenceError('pet not found')

                if (petData.ownerId !== userId) throw new OwnershipError('user not owner of pet')

                return data.deletePet(petId)
            })
    }

    getPet(userId, petId) {
        validate.id(userId, 'userId')
        validate.id(petId, 'petId')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                return data.findPetById(petId)
            })
            .then(petData => {
                if (!petData) throw new ExistenceError('pet not found')

                if (petData.ownerId !== userId) throw new OwnershipError('user not owner of pet')

                const { id, ownerId, name, birthdate, weight, image } = petData

                return new Pet(id, ownerId, name, birthdate, weight, image)
            })
    }

    modifyPet(userId, petId, name, birthdate, weight, image) {
        validate.id(userId, 'userId')
        validate.id(petId, 'petId')
        validate.name(name)
        validate.date(birthdate, 'birthdate')
        validate.number(weight, 'weight')
        validate.url(image, 'image')

        return data.findUserById(userId)
            .then(userData => {
                if (!userData) throw new ExistenceError('user not found')

                return data.findPetById(petId)
            })
            .then(petData => {
                if (!petData) throw new ExistenceError('pet not found')

                if (petData.ownerId !== userId) throw new OwnershipError('user not owner of pet')

                data.updatePet(new PetData(petId, userId, name, birthdate, weight, image))
            })
    }
}

// instance

export const logic = new Logic()
