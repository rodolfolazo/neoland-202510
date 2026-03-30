import { SystemError } from './errors.js'
import { UserModel, PetModel } from './models.js'

// models

export class UserData {
    constructor(id, name, email, username, password, image, role) {
        this.id = id
        this.name = name
        this.email = email
        this.username = username
        this.password = password
        this.image = image
        this.role = role
    }
}

export class PetData {
    constructor(id, ownerId, name, birthdate, weight, image) {
        this.id = id
        this.ownerId = ownerId
        this.name = name
        this.birthdate = birthdate
        this.weight = weight
        this.image = image
    }
}

// manager

class Data {
    insertUser(userData) {
        const userModel = new UserModel(userData)

        return userModel.save()
            .catch(error => { throw new SystemError(error.message) })
            .then(userModel => { })
    }

    findUserByEmail(email) {
        return UserModel.findOne({ email })
            .catch(error => { throw new SystemError(error.message) })
            .then(userModel => {
                if (!userModel) return null

                const { id, name, email, username, password } = userModel

                return new UserData(id, name, email, username, password)
            })
    }

    findUserByUsername(username) {
        return UserModel.findOne({ username })
            .catch(error => { throw new SystemError(error.message) })
            .then(userModel => {
                if (!userModel) return null

                const { id, name, email, username, password } = userModel

                return new UserData(id, name, email, username, password)
            })
    }

    findUserById(userId) {
        return UserModel.findById(userId)
            .catch(error => { throw new SystemError(error.message) })
            .then(userModel => {
                if (!userModel) return null

                const { id, name, email, username, password, image, role } = userModel

                return new UserData(id, name, email, username, password, image, role)
            })
    }

    updateUser(user) {
        return UserModel.updateOne({ _id: user.id }, user)
            .catch(error => { throw new SystemError(error.message) })
            .then(userModel => { })
    }

    deleteAllUsers() {
        return UserModel.deleteMany()
            .catch(error => { throw new SystemError(error.message) })
            .then(result => { })
    }

    insertPet(petData) {
        const { ownerId, name, birthdate, weight, image } = petData

        const petModel = new PetModel({ owner: ownerId, name, birthdate, weight, image })

        return petModel.save()
            .catch(error => { throw new SystemError(error.message) })
            .then(petModel => { })
    }

    findPetsByUserId(userId) {
        return PetModel.find({ owner: userId })
            .catch(error => { throw new SystemError(error.message) })
            .then(petModels => petModels.map(petModel => {
                const { id, owner, name, birthdate, weight, image } = petModel

                return new PetData(id, owner.toString(), name, birthdate, weight, image)
            }))
    }

    findPetById(petId) {
        return PetModel.findById(petId)
            .catch(error => { throw new SystemError(error.message) })
            .then(petModel => {
                if (!petModel) return null

                const { id, owner, name, birthdate, weight, image } = petModel

                return new PetData(id, owner.toString(), name, birthdate, weight, image)
            })
    }

    updatePet(petData) {
        const { id, ownerId, name, birthdate, weight, image } = petData

        return PetModel.updateOne({ _id: id }, { $set: { owner: ownerId, name, birthdate, weight, image } })
            .catch(error => { throw new SystemError(error.message) })
            .then(result => { })
    }

    deletePet(petId) {
        return PetModel.deleteOne({ _id: petId })
            .catch(error => { throw new SystemError(error.message) })
            .then(result => { })
    }

    deleteAllPets() {
        return PetModel.deleteMany()
            .catch(error => { throw new SystemError(error.message) })
            .then(result => { })
    }
}

// instance

export const data = new Data()

