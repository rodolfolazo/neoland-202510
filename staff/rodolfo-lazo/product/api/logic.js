const { data, User, Pet } = require('./data')

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const URL_REGEX = /(www|http:|https:)+[^\s]+[\w]/
const ISODATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const USER_ID_REGEX = /^\user-[0-9]+$/
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

        let user = data.findUserByEmail(email)

        if (user !== null) throw new Error('user email already exists')

        user = data.findUserByUsername(username)

        if (user !== null) throw new Error('user username already exists')

        user = new User('user-' + data.usersCount, name, email, username, password, null, 'regular')

        data.insertUser(user)
    }

    authenticateUser(username, password) {
        if (typeof username !== 'string') throw new Error('invalid username type')
        if (username.length < 3) throw new Error('invalid username length')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        const user = data.findUserByUsername(username)

        if (user === null) throw new Error('user not found')

        if (user.password !== password) throw new Error('incorrect password')

        return user.id
    }

    changeUserEmail(userId, email, newEmail, newEmailRepeat) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

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

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        if (user.email !== email) throw new Error('email do not belong to user')

        const otherUser = data.findUserByEmail(newEmail)

        if (otherUser) throw new Error('newEmail belongs to another user')

        const { name, username, password, image } = user

        data.updateUser(new User(userId, name, newEmail, username, password, image))
    }

    changeUserPassword(userId, password, newPassword, newPasswordRepeat) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof password !== 'string') throw new Error('invalid password type')
        if (password.length < 8) throw new Error('invalid password length')

        if (typeof newPassword !== 'string') throw new Error('invalid newPassword type')
        if (newPassword.length < 8) throw new Error('invalid newPassword length')

        if (typeof newPasswordRepeat !== 'string') throw new Error('invalid newPasswordRepeat type')
        if (newPasswordRepeat.length < 8) throw new Error('invalid newPasswordRepeat length')

        if (newPassword !== newPasswordRepeat) throw new Error('newPassword and newPasswordRepeat do not match')

        const user = data.findUserById(userId)

        if (!user) throw new Error('user not found')

        if (user.password !== password) throw new Error('incorrect password')

        const { name, email, username, image } = user

        data.updateUser(new User(userId, name, email, username, newPassword, image))
    }

    getUser(userId) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const { name, email, username, image } = user

        return { name, email, username, image }
    }

    changeUserImage(userId, image) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof image !== 'string') throw new Error('invalid image type')
        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        const user = data.findUserById(userId)

        if (!user) throw new Error('user not found')

        const { name, email, username, password } = user

        data.updateUser(new User(userId, name, email, username, password, image))
    }

    addPet(userId, name, birthdate, weight, image) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')
        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')
        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pet = new Pet('pet-' + data.petsCount, userId, name, birthdate, weight, image)

        data.insertPet(pet)
    }

    getPets(userId) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pets = data.findPetsByUserId(userId)

        return pets
    }

    removePet(userId, petId) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pet = data.findPetById(petId)

        if (!pet) throw new Error('pet not found')

        if (pet.userId !== userId) throw new Error('user not owner of pet')

        data.deletePet(petId)
    }

    getPet(userId, petId) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new Error('pet not found')

        if (pet.userId !== userId) throw new Error('user not owner of pet')

        return pet
    }

    modifyPet(userId, petId, name, birthdate, weight, image) {
        if (typeof userId !== 'string') throw new Error('invalid userId type')
        if (!USER_ID_REGEX.test(userId)) throw new Error('invalid userId format')

        if (typeof petId !== 'string') throw new Error('invalid pet-id type')
        if (!PET_ID_REGEX.test(petId)) throw new Error('invalid pet-id format')

        if (typeof name !== 'string') throw new Error('invalid name type')
        if (name.length < 1) throw new Error('invalid name length')

        if (typeof birthdate !== 'string') throw new Error('invalid birthdate type')
        if (!ISODATE_REGEX.test(birthdate)) throw new Error('invalid birthdate format')

        if (typeof weight !== 'number' || isNaN(weight)) throw new Error('invalid weight type')

        if (typeof image !== 'string') throw new Error('invalid image type')
        if (!URL_REGEX.test(image)) throw new Error('invalid image format')

        const user = data.findUserById(userId)
        if (!user) throw new Error('user not found')

        const pet = data.findPetById(petId)
        if (!pet) throw new Error('pet not found')

        if (pet.userId !== userId) throw new Error('user not owner of pet')

        data.updatePet(new Pet(petId, userId, name, birthdate, weight, image))
    }
}

// instance

const logic = new Logic()

module.exports = {
    logic
}
