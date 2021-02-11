const jwt = require('jsonwebtoken')

const userService = require('../../services/users')

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body)
  if (!user.success) {
    return res.status(422).json({ success: false, message: user.message })
  }

  return res.status(201).json({ ...user })
}

exports.login = async (req, res) => {
  const login = await userService.login(req.body)

  if (!login.success) {
    return res.status(422).json({ ...login })
  }

  return res.status(200).json({ ...login })
}

exports.getAllUsers = async (req, res) => {
  let authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ success: false, message: 'Token não informado' })
  }

  authorization = authorization.replace('Bearer ', '')

  jwt.verify(authorization, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token inválido' })
    }

    return decoded
  })

  const data = await userService.getAllUsers(req.query)

  res.status(200).json({ ...data })
}
