import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ReviewController from './app/controllers/ReviewController';

import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateUserDelete from './app/validators/UserDelete';
import ValidateSessionStore from './app/validators/SessionStore';
import ValidateReviewStore from './app/validators/ReviewStore';
import ValidateReviewUpdate from './app/validators/ReviewUpdate';
import ValidateReviewDelete from './app/validators/ReviewDelete';

import authMiddleware from './app/middlewares/auth';

import SpotifyFind from './app/controllers/SpotifyFind';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/find-album', SpotifyFind.search);
routes.get('/get-album', SpotifyFind.album);
routes.get('/get-artist', SpotifyFind.artist);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post('/session', ValidateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', ValidateUserUpdate, UserController.update);
routes.delete('/users', ValidateUserDelete, UserController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/reviews', ValidateReviewStore, ReviewController.store);
routes.put('/reviews', ValidateReviewUpdate, ReviewController.update);
routes.delete('/reviews', ValidateReviewDelete, ReviewController.delete);

export default routes;
