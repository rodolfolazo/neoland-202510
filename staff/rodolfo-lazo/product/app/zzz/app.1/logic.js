function Logic() {

}

Logic.prototype.registerUser = function (name, email, username, password, passwordRepeat) {
    if (typeof name !== 'string') throw new Error('invalid name type')
    if (name.length < 1) throw new Error('invalid name length')

    if (typeof email !== 'string') throw new Error('invalid email type')
    if (email.length < 6) throw new Error('invalid email length')

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

    user = new User('user-' + data.usersCount, name, email, username, password, 'regular')

    data.insertUser(user)
}

Logic.prototype.loginUser = function(username, password) {
    if (typeof username !== 'string') throw new Error('invalid username type')
    if (username.length < 3) throw new Error('invalid username length')

    if (typeof password !== 'string') throw new Error('invalid password type')
    if (password.length < 8) throw new Error('invalid password length')

    const user = data.findUserByUsername(username)

    if (user === null) throw new Error('user not found')

    if (user.password !== password) throw new Error('incorrect password')
}

// instance

const logic = new Logic()
