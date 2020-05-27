import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

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
import NetworkController from './app/controllers/NetworkController';
import CommentPolicyReview from './app/controllers/CommentPolicyReview';
import CommentPolicyList from './app/controllers/CommentPolicyList';
import CommentReviewController from './app/controllers/CommentReviewController';
import CommentListController from './app/controllers/CommentListController';
import ReviewCommentLikeController from './app/controllers/ReviewCommentLikeController';
import ListCommentLikeController from './app/controllers/ListCommentLikeController';
import UserBlockController from './app/controllers/UserBlockController';
import ReportUserController from './app/controllers/ReportUserController';
import ReportAlbumController from './app/controllers/ReportAlbumController';
import ReportReviewController from './app/controllers/ReportReviewController';
import ReportListController from './app/controllers/ReportListController';
import ReportCommentReviewController from './app/controllers/ReportCommentReviewController';
import ReportCommentListController from './app/controllers/ReportCommentListController';

// import ValidateUserIndex from './app/validators/UserIndex';
// import ValidateUserShow from './app/validators/UserShow';
import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateUserDestroy from './app/validators/UserDestroy';

import ValidateSessionStore from './app/validators/SessionStore';
import ValidateForgotPassword from './app/validators/ForgotPassword';
import ValidateResetPassword from './app/validators/ResetPassword';

// import ValidateReviewIndex from './app/validators/ReviewIndex';
// import ValidateReviewShow from './app/validators/ReviewShow';
import ValidateReviewStore from './app/validators/ReviewStore';
import ValidateReviewUpdate from './app/validators/ReviewUpdate';
import ValidateReviewDestroy from './app/validators/ReviewDestroy';

// import ValidateListIndex from './app/validators/ListIndex';
// import ValidateListShow from './app/validators/ListShow';
import ValidateListStore from './app/validators/ListStore';
import ValidateListUpdate from './app/validators/ListUpdate';
import ValidateListDestroy from './app/validators/ListDestroy';

import ValidateReviewLikeStore from './app/validators/ReviewLikeStore';
import ValidateReviewLikeDestroy from './app/validators/ReviewLikeDestroy';

import ValidateListLikeStore from './app/validators/ListLikeStore';
import ValidateListLikeDestroy from './app/validators/ListLikeDestroy';

import ValidateWishlistStore from './app/validators/WishlistStore';
import ValidateWishlistDestroy from './app/validators/WishlistDestroy';

import ValidateNetworkStore from './app/validators/NetworkStore';
import ValidateNetworkDestroy from './app/validators/NetworkDestroy';

import ValidateCommentPolicyReviewStore from './app/validators/CommentPolicyReviewStore';
import ValidateCommentPolicyListStore from './app/validators/CommentPolicyListStore';

import ValidateCommentReviewStore from './app/validators/CommentReviewStore';
import ValidateCommentReviewUpdate from './app/validators/CommentReviewUpdate';
import ValidateCommentReviewDestroy from './app/validators/CommentReviewDestroy';

import ValidateCommentListStore from './app/validators/CommentListStore';
import ValidateCommentListUpdate from './app/validators/CommentListUpdate';
import ValidateCommentListDestroy from './app/validators/CommentListDestroy';

import ValidateReviewCommentLikeStore from './app/validators/ReviewCommentLikeStore';
import ValidateReviewCommentLikeDestroy from './app/validators/ReviewCommentLikeDestroy';

import ValidateListCommentLikeStore from './app/validators/ListCommentLikeStore';
import ValidateListCommentLikeDestroy from './app/validators/ListCommentLikeDestroy';

import ValidateUserBlockStore from './app/validators/UserBlockStore';
import ValidateUserBlockDestroy from './app/validators/UserBlockDestroy';

import ValidateReportUserStore from './app/validators/ReportUserStore';
import ValidateReportAlbumStore from './app/validators/ReportAlbumStore';
import ValidateReportReviewStore from './app/validators/ReportReviewStore';
import ValidateReportListStore from './app/validators/ReportListStore';
import ValidateReportCommentReviewStore from './app/validators/ReportCommentReviewStore';
import ValidateReportCommentListStore from './app/validators/ReportCommentListStore';

import SpotifyFind from './app/controllers/SpotifyFind';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);
const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.get('/find-album', SpotifyFind.search);
routes.get('/get-album', SpotifyFind.album);
routes.get('/get-artist', SpotifyFind.artist);

// routes.get('/users', ValidateUserIndex, UserController.index);
// routes.get('/reviews', ValidateReviewIndex, ReviewController.index);
// routes.get('/lists', ValidateListIndex, ListController.index);
// routes.get('/users/:user_id', ValidateUserShow, UserController.show);
// routes.get('/reviews/:review_id', ValidateReviewShow, ReviewController.show);
// routes.get('/lists/:list_id', ValidateListShow, ListController.show);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  ValidateSessionStore,
  SessionController.store
);
routes.post(
  '/forgot-password',
  ValidateForgotPassword,
  SessionController.forgotPassword
);
routes.post(
  '/reset-password',
  ValidateResetPassword,
  SessionController.resetPassword
);

routes.use(authMiddleware);

routes.put('/users', ValidateUserUpdate, UserController.update);
routes.delete('/users', ValidateUserDestroy, UserController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/reviews', ValidateReviewStore, ReviewController.store);
routes.put(
  '/reviews/:review_id',
  ValidateReviewUpdate,
  ReviewController.update
);
routes.delete(
  '/reviews/:review_id',
  ValidateReviewDestroy,
  ReviewController.destroy
);

routes.post('/lists', ValidateListStore, ListController.store);
routes.put('/lists/:list_id', ValidateListUpdate, ListController.update);
routes.delete('/lists/:list_id', ValidateListDestroy, ListController.destroy);

routes.post(
  '/like-review/:review_id',
  ValidateReviewLikeStore,
  ReviewLikeController.store
);
routes.delete(
  '/like-review/:review_id',
  ValidateReviewLikeDestroy,
  ReviewLikeController.destroy
);

routes.post(
  '/like-list/:list_id',
  ValidateListLikeStore,
  ListLikeController.store
);
routes.delete(
  '/like-list/:list_id',
  ValidateListLikeDestroy,
  ListLikeController.destroy
);

routes.post(
  '/wishlist/:spotify_id',
  ValidateWishlistStore,
  WishlistController.store
);
routes.delete(
  '/wishlist/:spotify_id',
  ValidateWishlistDestroy,
  WishlistController.destroy
);

routes.post('/public-wishlist/', WishlistController.makePublic);
routes.post('/private-wishlist/', WishlistController.makePrivate);

routes.post(
  '/follow-user/:follow_user_id',
  ValidateNetworkStore,
  NetworkController.store
);
routes.delete(
  '/follow-user/:follow_user_id',
  ValidateNetworkDestroy,
  NetworkController.destroy
);

routes.post(
  '/change-comment-policy/review',
  ValidateCommentPolicyReviewStore,
  CommentPolicyReview.store
);
routes.post(
  '/change-comment-policy/list',
  ValidateCommentPolicyListStore,
  CommentPolicyList.store
);

routes.post(
  '/comment-reviews',
  ValidateCommentReviewStore,
  CommentReviewController.store
);
routes.put(
  '/comment-reviews/:comment_id',
  ValidateCommentReviewUpdate,
  CommentReviewController.update
);
routes.delete(
  '/comment-reviews/:comment_id',
  ValidateCommentReviewDestroy,
  CommentReviewController.destroy
);

routes.post(
  '/comment-lists',
  ValidateCommentListStore,
  CommentListController.store
);
routes.put(
  '/comment-lists/:comment_id',
  ValidateCommentListUpdate,
  CommentListController.update
);
routes.delete(
  '/comment-lists/:comment_id',
  ValidateCommentListDestroy,
  CommentListController.destroy
);

routes.post(
  '/like-review-comment/:comment_id',
  ValidateReviewCommentLikeStore,
  ReviewCommentLikeController.store
);
routes.delete(
  '/like-review-comment/:comment_id',
  ValidateReviewCommentLikeDestroy,
  ReviewCommentLikeController.destroy
);

routes.post(
  '/like-list-comment/:comment_id',
  ValidateListCommentLikeStore,
  ListCommentLikeController.store
);
routes.delete(
  '/like-list-comment/:comment_id',
  ValidateListCommentLikeDestroy,
  ListCommentLikeController.destroy
);

routes.post(
  '/block-user/:block_user_id',
  ValidateUserBlockStore,
  UserBlockController.store
);
routes.delete(
  '/block-user/:block_user_id',
  ValidateUserBlockDestroy,
  UserBlockController.destroy
);

routes.post(
  '/report-user/:report_user_id',
  ValidateReportUserStore,
  ReportUserController.store
);
routes.post(
  '/report-album/:report_album_id',
  ValidateReportAlbumStore,
  ReportAlbumController.store
);
routes.post(
  '/report-review/:report_review_id',
  ValidateReportReviewStore,
  ReportReviewController.store
);
routes.post(
  '/report-list/:report_list_id',
  ValidateReportListStore,
  ReportListController.store
);
routes.post(
  '/report-comment-review/:report_review_comment_id',
  ValidateReportCommentReviewStore,
  ReportCommentReviewController.store
);
routes.post(
  '/report-comment-list/:report_list_comment_id',
  ValidateReportCommentListStore,
  ReportCommentListController.store
);

export default routes;
