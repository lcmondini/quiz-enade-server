import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CoordinatorController from './app/controllers/CoordinatorController';
import QuestionController from './app/controllers/QuestionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/coordinators', CoordinatorController.index);

routes.post('/questions', QuestionController.store);
routes.get('/questions', QuestionController.index);
routes.put('/questions', QuestionController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
