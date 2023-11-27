import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import {
    ICommentCreate,
    ICommentCreateQueryData,
    ICommentEdit,
    ICommentEditQueryData,
    ICommentResponse,
    ICommentService,
    ISubCommentGetQueryData,
} from 'types/comment';
import { isExist } from 'utils/helper';

class CommentController {
    // private taskService: ITaskService;
    private commentService: ICommentService;

    constructor(commentService: ICommentService) {
        // this.taskService = taskService;
        this.commentService = commentService;
    }

    // private getAllTasks = async (req: Request, res: Response) => {
    //     try {
    //         const tasks = await TaskService.getAllTasks();
    //         res.json(tasks);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Failed to retrieve tasks' });
    //     }
    // }

    // private getTaskById = async (req: Request, res: Response) => {
    //     const taskId = req.params.taskId;
    //     try {
    //         const task = await TaskService.getTaskById(taskId);
    //         if (task) {
    //             res.json(task);
    //         } else {
    //             res.status(404).json({ error: 'Task not found' });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ error: 'Failed to find task by ID' });
    //     }
    // }

    getSubComments = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.query as ISubCommentGetQueryData;
            const subComments: ICommentResponse =
                await this.commentService.getSubComments(id);
            res.status(200).json(subComments);
        } catch (error) {
            next(error);
        }
    };

    createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentData: ICommentCreateQueryData = req.body;
            const newCommentData: ICommentCreate = {
                author: commentData.author,
                taskId: new Types.ObjectId(commentData.taskId),
                text: commentData.text,
                ...(commentData.parentId && {
                    parentId: new Types.ObjectId(commentData.parentId),
                }),
            };
            const createdComment: ICommentResponse =
                await this.commentService.createComment(newCommentData);
            console.log('createdComment', createdComment);
            res.status(201).json(createdComment);
        } catch (error) {
            next(error);
        }
    };

    updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(this.commentService);
            const commentData: ICommentEditQueryData = req.body;
            const updateCommentData: ICommentEdit = {
                author: commentData.author,
                taskId: new Types.ObjectId(commentData.taskId),
                text: commentData.text,
                id: new Types.ObjectId(commentData.id),
            };
            const updatedComment: ICommentResponse | null =
                await this.commentService.update(updateCommentData);
            console.log(updatedComment);
            if (!isExist(updatedComment)) {
                throw new Error('Comment not found');
            }
            console.log('updatedComment', updatedComment);
            res.status(201).json(updatedComment);
        } catch (error) {
            next(error);
        }
    };

    public deleteComment = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const commentId = req.body.id;
        try {
            const deletedComment = await this.commentService.deleteComment({
                id: commentId,
            });

            if (deletedComment?.parentId) {
                this.commentService.update({
                    id: deletedComment.parentId,
                    replyCount: -1,
                });
            }
            if (!isExist(deletedComment)) {
                throw new Error('Comment not found.');
            }
            res.status(200).json(deletedComment);
        } catch (error) {
            next(error);
        }
    };
}

export default CommentController;
