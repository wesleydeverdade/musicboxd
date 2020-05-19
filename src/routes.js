import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ReviewController from './app/controllers/ReviewController';
import ListController from './app/controllers/ListController';
import ReviewLikeController from './app/controllers/ReviewLikeController';
import ListLikeController from './app/controllers/ListLikeController';
import WishlistController from './app/controllers/WishlistController';

import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateUserDelete from './app/validators/UserDelete';
import ValidateSessionStore from './app/validators/SessionStore';

import ValidateReviewIndex from './app/validators/ReviewIndex';
import ValidateReviewStore from './app/validators/ReviewStore';
import ValidateReviewUpdate from './app/validators/ReviewUpdate';
import ValidateReviewDelete from './app/validators/ReviewDelete';

import ValidateListIndex from './app/validators/ListIndex';
import ValidateListStore from './app/validators/ListStore';
import ValidateListUpdate from './app/validators/ListUpdate';
import ValidateListDelete from './app/validators/ListDelete';

import ValidateReviewLikeStore from './app/validators/ReviewLikeStore';
import ValidateReviewLikeDelete from './app/validators/ReviewLikeDelete';
import ValidateListLikeStore from './app/validators/ListLikeStore';
import ValidateListLikeDelete from './app/validators/ListLikeDelete';

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
routes.put(
  '/reviews/:review_id',
  ValidateReviewUpdate,
  ReviewController.update
);
routes.delete(
  '/reviews/:review_id',
  ValidateReviewDelete,
  ReviewController.delete
);

routes.get('/lists', ValidateListIndex, ListController.index);
routes.post('/lists', ValidateListStore, ListController.store);
routes.put('/lists/:list_id', ValidateListUpdate, ListController.update);
routes.delete('/lists/:list_id', ValidateListDelete, ListController.delete);

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
  '/like-list/:list_id',
  ValidateListLikeStore,
  ListLikeController.store
);
routes.delete(
  '/like-list/:list_id',
  ValidateListLikeDelete,
  ListLikeController.delete
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
