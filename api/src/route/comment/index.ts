import CommentController from 'controller/comment';
import express, { Router } from 'express';
import CommentModel from 'model/comment';
import CommentRepository from 'repository/comment';
import CommentService from 'service/comment';
import isAuth from 'utils/middleware';

const commentRepository = new CommentRepository(CommentModel);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

const commentRoutes: Router = express.Router();

commentRoutes.post('/comment', isAuth, commentController.createComment);
commentRoutes.get('/comment/replies', isAuth, commentController.getSubComments);
commentRoutes.put('/comment', isAuth, commentController.updateComment);
commentRoutes.delete('/comment', isAuth, commentController.deleteComment);

export default commentRoutes;
