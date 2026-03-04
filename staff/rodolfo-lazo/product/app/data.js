// manager

class Data {
    setLoggedInUserId(userId) {
        sessionStorage.userId = userId
    }

    getLoggedInUserId() {
        return sessionStorage.userId
    }

    removeLoggedInUserId() {
        delete sessionStorage.userId
    }
}

// instance

export const data = new Data()

