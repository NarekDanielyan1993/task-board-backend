import { Model, RootQuerySelector } from 'mongoose';
import {
    IAttachmentCreate,
    IAttachmentModel,
    IAttachmentRepository,
    IAttachmentResponse,
} from 'types/attachment';

class AttachmentRepository implements IAttachmentRepository {
    private model: Model<IAttachmentModel>;

    constructor(model: Model<IAttachmentModel>) {
        this.model = model;
    }

    async getBy(
        data: RootQuerySelector<IAttachmentModel>,
    ): Promise<IAttachmentResponse[]> {
        return await this.model.find(data);
    }

    async create(
        attachments: IAttachmentCreate[],
    ): Promise<IAttachmentResponse[]> {
        try {
            const newAttachments = (await this.model.create(
                attachments,
            )) as IAttachmentResponse[];
            return newAttachments;
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while creating the priority.');
        }
    }

    // async getPrioritiesForSelect(data: IGetPriorityQueryParams): Promise<IPriorityResponse[]> {
    //     try {
    //         const priorities: IPriorityResponse[] = await this.model.find(data).select('-createdAt -updatedAt -boardId');
    //         return priorities;
    //     } catch (error) {
    //         throw new Error('An error occurred while creating the priority.');
    //     }
    // }

    async deleteMany(data: RootQuerySelector<IAttachmentModel>): Promise<any> {
        try {
            const attachmentsToDelete = await this.model.find(data);

            await this.model.deleteMany(data);
            return attachmentsToDelete;
        } catch (error) {
            console.log('Faield to delete attachments: ', error);
            throw new Error('An error occurred while creating the state.');
        }
    }
}

export default AttachmentRepository;
