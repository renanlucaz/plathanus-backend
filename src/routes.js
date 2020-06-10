import { Router } from 'express';

import PhoneController from './app/controllers/PhoneController';
import ValidationController from './app/controllers/ValidationController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);

routes.post('/phones', PhoneController.store);
routes.post('/validations', ValidationController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

export default routes;
