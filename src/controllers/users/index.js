const userService = require('../../services/users')

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body)

  if (!user.success) {
    return res.status(422).json({ success: false, message: user.message })
  }

  return res.status(201).json({ ...user })
}
