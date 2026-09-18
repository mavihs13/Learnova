import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const routes = express.Router();

routes.get('/user/:id', authMiddleware, userController);

export default routes;