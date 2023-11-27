import { RootQuerySelector } from 'mongoose';
import {
    IAttachmentCreate,
    IAttachmentModel,
    IAttachmentRepository,
    IAttachmentResponse,
    IAttachmentService,
} from 'types/attachment';

class AttachmentService implements IAttachmentService {
    private repository: IAttachmentRepository;

    constructor(repository: IAttachmentRepository) {
        this.repository = repository;
    }

    async getBy(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]> {
        return await this.repository.getBy(data);
    }

    // async getAll(taskId: string): Promise<IAttachmentResponse[]> {
    //     return await this.repository.getAll(boardId);
    // }

    async create(
        attachments: IAttachmentCreate[],
    ): Promise<IAttachmentResponse[]> {
        return await this.repository.create(attachments);
    }

    // async getStagesByBoard(boardId: string): Promise<IStageResponse[]> {
    //     return await this.repository.getAll(boardId);
    // }

    async deleteMany(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]> {
        return await this.repository.deleteMany(data);
    }
}

export default AttachmentService;
