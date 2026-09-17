import express from 'express'
import {userController} from '../controllers/user.controller.js'

const routes = express.Router()
routes.get('/user', userController)

export default routes
