const express = require('express')
const userController = require('./controllers/users')

const routes = express.Router()

// route users
routes.post('/user', userController.createUser)
routes.post('/user/login', userController.login)
routes.get('/users', userController.getAllUsers)

module.exports = routes
