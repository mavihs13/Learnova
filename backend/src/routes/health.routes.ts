import express from 'express'
import healthController from '../controllers/health.controllers.js'
const routes = express.Router()

routes.get('/health', healthController)


export default routes