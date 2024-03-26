import {
    ICommentCreate,
    ICommentDelete,
    ICommentEdit,
    ICommentRepository,
    ICommentResponse,
    ICommentService,
} from 'types/index.js';

export class CommentService implements ICommentService {
    private commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async createComment(
        commentData: ICommentCreate,
    ): Promise<ICommentResponse> {
        console.log(this.commentRepository);
        return await this.commentRepository.create(commentData);
    }

    async getSubComments(id: string): Promise<any> {
        return await this.commentRepository.getSubComments(id);
    }

    // async getTasks() {
    //     return this.taskRepository.findAll();
    // }

    // async getTaskById(taskId) {
    //     return this.taskRepository.findById(taskId);
    // }

    async update(commentData: ICommentEdit): Promise<ICommentResponse | null> {
        return await this.commentRepository.update(commentData);
    }

    async deleteComment(
        commentData: ICommentDelete,
    ): Promise<ICommentResponse | null> {
        return await this.commentRepository.delete(commentData);
    }

    // async deleteTasks(
    //     data: QuerySelector<ITaskModel>,
    // ): Promise<ITaskDeleteResponse> {
    //     return await this.taskRepository.deleteMany(data);
    // }
}

export default CommentService;
