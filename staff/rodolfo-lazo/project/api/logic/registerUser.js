import bcrypt from 'bcryptjs'
import { DuplicityError, SystemError, validate } from 'com'
import { data, UserData } from '../data/index.js'

export function registerUser(
  name,
  email,
  username,
  password,
  passwordRepeat,
  image = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3lyMXl0YWRqcWNtcGx2aG5oYzc2NDB5ajhiYjliY3d2Z212ZDhwNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tRnwzleS2SsVi/giphy.gif',
  role = 'regular',
) {
  validate.name(name)
  validate.email(email, 'email')
  validate.username(username)
  validate.password(password, 'password')
  validate.password(passwordRepeat, 'passwordRepeat')
  validate.match(password, passwordRepeat, 'password', 'passwordRepeat')
  validate.url(image, 'image')

  return data
    .findUserByEmail(email)
    .then((userData) => {
      if (userData) throw new DuplicityError('user email already exists')

      return data.findUserByUsername(username)
    })
    .then((userData) => {
      if (userData) throw new DuplicityError('user username already exists')

      return bcrypt.hash(password, 10).catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((hash) => {
      const userData = new UserData(
        null,
        name,
        email,
        username,
        hash,
        image,
        role,
      )

      return data.insertUser(userData)
    })
}
