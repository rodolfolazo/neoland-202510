// manager

class Data {
    constructor() {
        this.loggedInUserId = null
    }

    setLoggedInUserId(userId) {
        this.loggedInUserId = userId
    }

    getLoggedInUserId() {
        return this.loggedInUserId
    }
}

// instance

export const data = new Data()

