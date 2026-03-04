// manager

class Data {
    setToken(token) {
        sessionStorage.token = token
    }

    getToken() {
        return sessionStorage.token
    }

    removeToken() {
        delete sessionStorage.token
    }
}

// instance

export const data = new Data()

