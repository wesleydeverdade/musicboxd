import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ReviewController from './app/controllers/ReviewController';
import ReviewLikeController from './app/controllers/ReviewLikeController';
import WishlistController from './app/controllers/WishlistController';

import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateUserDelete from './app/validators/UserDelete';
import ValidateSessionStore from './app/validators/SessionStore';

import ValidateReviewIndex from './app/validators/ReviewIndex';
import ValidateReviewStore from './app/validators/ReviewStore';
import ValidateReviewUpdate from './app/validators/ReviewUpdate';
import ValidateReviewDelete from './app/validators/ReviewDelete';
import ValidateReviewLikeStore from './app/validators/ReviewLikeStore';
import ValidateReviewLikeDelete from './app/validators/ReviewLikeDelete';
import ValidateWishlistStore from './app/validators/WishlistStore';
import ValidateWishlistDelete from './app/validators/WishlistDelete';

import authMiddleware from './app/middlewares/auth';

import SpotifyFind from './app/controllers/SpotifyFind';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/find-album', SpotifyFind.search);
routes.get('/get-album', SpotifyFind.album);
routes.get('/get-artist', SpotifyFind.artist);

routes.get('/reviews', ValidateReviewIndex, ReviewController.index);

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

routes.post(
  '/like-review/:review_id',
  ValidateReviewLikeStore,
  ReviewLikeController.store
);
routes.delete(
  '/like-review/:review_id',
  ValidateReviewLikeDelete,
  ReviewLikeController.delete
);

routes.post(
  '/wishlist/:spotify_id',
  ValidateWishlistStore,
  WishlistController.store
);
routes.delete(
  '/wishlist/:spotify_id',
  ValidateWishlistDelete,
  WishlistController.delete
);

export default routes;
