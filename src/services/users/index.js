require('dotenv').config()
const jwt = require('jsonwebtoken')

const userRepository = require('../../repositories/users')

function validatePayload({ name, email, password }) {
  if (!name) {
    return { isValid: false, message: 'Favor informar o nome' }
  }

  if (!email) {
    return { isValid: false, message: 'Favor informar o email' }
  }

  if (!password) {
    return { isValid: false, message: 'Favor informar a senha' }
  }

  return { isValid: true }
}

exports.createUser = async ({ name, email, password }) => {
  const { isValid, message } = validatePayload({ name, email, password })
  if (!isValid) {
    return { success: false, message }
  }

  const user = await userRepository.getByEmail(email)

  if (user.length > 0) {
    return { success: false, message: 'Usuário já existe' }
  }

  return userRepository.createUser({ name, email, password })
}

exports.login = async ({ email, password }) => {
  const user = await userRepository.getByEmail(email)

  if (user.length === 0) {
    return { success: false, message: 'Usuário não existe' }
  }

  if (user[0].password !== password) {
    return { success: false, message: 'Email ou senha inválido' }
  }

  const token = jwt.sign({ user_id: user[0].id }, process.env.PRIVATE_KEY)

  return { success: true, message: 'Login realizado com sucesso', token }
}

exports.getAllUsers = async ({ page, limit }) => {
  if (typeof page !== Number) page = 1
  if (typeof limit !== Number) limit = 10

  const offset = (page - 1) * limit

  const data = await userRepository.getAllUsers({ offset, limit })

  return {
    success: true,
    current: {
      pagination: {
        pageCurrent: page,
        limit,
        totalItems: Number(data.totalItems),
      },
      users: data.users,
    },
  }
}
