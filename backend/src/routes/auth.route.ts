import express from 'express';

import {
    registerController,
    loginController
} from '../controllers/auth.controller.js';

const routes = express.Router();

routes.post('/auth/register', registerController);
routes.post('/auth/login', loginController);

export default routes;