require('dotenv').config()
const jwt = require('jsonwebtoken')
const models = require('../../repositories/users')

exports.createUser = async ({ name, email, password }) => {
  const { isValid, message } = validatePayload({ name, email, password })
  if (!isValid) {
    return { success: false, message }
  }

  return models.User.create({ name, email, password })
    .then((user) => {
      const userCreated = {
        id: user.id,
        name: user.name,
        email: user.email,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      }

      return { success: true, user: userCreated }
    })
    .catch((err) => {
      if (err.parent.code === '23505') {
        return { success: false, message: 'Já existe um usuário com este e-mail' }
      }

      return { success: false, message: err.message }
    })
}
