import { data, User, Pet } from './data.js'

import { ValidationError, DuplicityError, ExistenceError, CredentialError, OwnershipError } from './errors.js'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const USER_ID_REGEX = /^\user-[0-9]+$/
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

        let user = data.findUserByEmail(email)

        if (user !== null) throw new DuplicityError('user email already exists')

        user = data.findUserByUsername(username)

        if (user !== null) throw new DuplicityError('user username already exists')

        user = new User('user-' + data.usersCount, name, email, username, password, null, 'regular')

        data.insertUser(user)
    }

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (username.length < 3) throw new ValidationError('invalid username length')

        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')

        const user = data.findUserByUsername(username)

        if (user === null) throw new ExistenceError('user not found')

        if (user.password !== password) throw new CredentialError('incorrect password')

        return user.id
    }

    changeUserEmail(userId, email, newEmail, newEmailRepeat) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

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

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        if (user.email !== email) throw new OwnershipError('email do not belong to user')

        const otherUser = data.findUserByEmail(newEmail)

        if (otherUser) throw new OwnershipError('newEmail belongs to another user')

        const { name, username, password, image } = user

        data.updateUser(new User(userId, name, newEmail, username, password, image))
    }

    changeUserPassword(userId, password, newPassword, newPasswordRepeat) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')

        if (typeof newPassword !== 'string') throw new ValidationError('invalid newPassword type')
        if (newPassword.length < 8) throw new ValidationError('invalid newPassword length')

        if (typeof newPasswordRepeat !== 'string') throw new ValidationError('invalid newPasswordRepeat type')
        if (newPasswordRepeat.length < 8) throw new ValidationError('invalid newPasswordRepeat length')

        if (newPassword !== newPasswordRepeat) throw new ValidationError('newPassword and newPasswordRepeat do not match')

        const user = data.findUserById(userId)

        if (!user) throw new ExistenceError('user not found')

        if (user.password !== password) throw new CredentialError('incorrect password')

        const { name, email, username, image } = user

        data.updateUser(new User(userId, name, email, username, newPassword, image))
    }

    getUser(userId) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const { name, email, username, image } = user

        return { name, email, username, image }
    }

    changeUserImage(userId, image) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        const user = data.findUserById(userId)

        if (!user) throw new ExistenceError('user not found')

        const { name, email, username, password } = user

        data.updateUser(new User(userId, name, email, username, password, image))
    }

    addPet(userId, name, birthdate, weight, image) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')

        if (typeof birthdate !== 'string') throw new ValidationError('invalid birthdate type')
        if (!ISODATE_REGEX.test(birthdate)) throw new ValidationError('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new ValidationError('invalid weight type')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = new Pet('pet-' + data.petsCount, userId, name, birthdate, weight, image)

        data.insertPet(pet)
    }

    getPets(userId) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pets = data.findPetsByUserId(userId)

        return pets
    }

    removePet(userId, petId) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)

        if (!pet) throw new ExistenceError('pet not found')

        if (pet.userId !== userId) throw new OwnershipError('user not owner of pet')

        data.deletePet(petId)
    }

    getPet(userId, petId) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new ExistenceError('pet not found')

        if (pet.userId !== userId) throw new OwnershipError('user not owner of pet')

        return pet
    }

    modifyPet(userId, petId, name, birthdate, weight, image) {
        if (typeof userId !== 'string') throw new ValidationError('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new ValidationError('invalid userId format')

        if (typeof petId !== 'string') throw new ValidationError('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new ValidationError('invalid pet-id format')

        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')

        if (typeof birthdate !== 'string') throw new ValidationError('invalid birthdate type')
        if (!ISODATE_REGEX.test(birthdate)) throw new ValidationError('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new ValidationError('invalid weight type')

        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image format')

        const user = data.findUserById(userId)
        if (!user) throw new ExistenceError('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new ExistenceError('pet not found')

        if (pet.userId !== userId) throw new OwnershipError('user not owner of pet')

        data.updatePet(new Pet(petId, userId, name, birthdate, weight, image))
    }
}

// instance

export const logic = new Logic()
