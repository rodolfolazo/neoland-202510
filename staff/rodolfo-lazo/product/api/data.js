// models

class User {
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

class Pet {
    constructor(id, userId, /*chip,*/ name, /*gender,*/ birthdate, weight, /*species, race, colors,*/ image) {
        this.id = id
        this.userId = userId
        // this.chip = chip
        this.name = name
        // this.gender = gender
        this.birthdate = birthdate
        this.weight = weight
        // this.species = species
        // this.race = race
        // this.colors = colors
        this.image = image
    }
}

// manager

class Data {
    constructor() {
        this.users = []
        this.usersCount = 0
        this.pets = []
        this.petsCount = 0
        this.loggedInUserId = null
    }

    insertUser(user) {
        this.users.push(user)
        this.usersCount++
    }

    findUserByEmail(email) {
        const user = this.users.find(user => user.email === email)

        return user || null
    }

    findUserByUsername(username) {
        const user = this.users.find(user => user.username === username)

        return user || null
    }

    findUserById(userId) {
        const user = this.users.find(user => user.id === userId)

        return user || null
    }

    updateUser(updatedUser) {
        const index = this.users.findIndex(user => user.id === updatedUser.id)

        this.users[index] = updatedUser
    }

    insertPet(pet) {
        this.pets.push(pet)
        this.petsCount++
    }

    findPetsByUserId(userId) {
        const foundPets = this.pets.filter(pet => pet.userId === userId)

        return foundPets
    }

    findPetById(petId) {
        const pet = this.pets.find(pet => pet.id === petId)

        return pet || null
    }

    updatePet(updatedPet) {
        const index = this.pets.findIndex(pet => pet.id === updatedPet.id)

        this.pets[index] = updatedPet
    }

    deletePet(petId) {
        const index = this.pets.findIndex(pet => pet.id === petId)

        data.pets.splice(index, 1)
    }
}

// instance

const data = new Data()

module.exports = {
    User,
    Pet,
    data
}

