import { InternalServerError } from 'lib/error';
import mongoose, { Model } from 'mongoose';
import {
    ICreatePriority,
    IGetPriorityQueryParams,
    IPriorityModel,
    IPriorityRepository,
    IPriorityResponse,
} from 'types/priority';

class PriorityRepository implements IPriorityRepository {
    private model: Model<IPriorityModel>;

    constructor(model: Model<IPriorityModel>) {
        this.model = model;
    }

    async create(priority: ICreatePriority): Promise<IPriorityResponse> {
        try {
            const newPriority = (await this.model.create({
                name: priority.name,
                boardId: new mongoose.Types.ObjectId(priority.boardId),
            })) as IPriorityResponse;
            return newPriority;
        } catch (error) {
            console.log(error);
            throw new InternalServerError(
                'An error occurred while creating the priority.',
            );
        }
    }

    async createMultiple(
        priorities: ICreatePriority[],
    ): Promise<IPriorityResponse[]> {
        try {
            const newPriorities = (await this.model.create(
                priorities,
            )) as IPriorityResponse[];
            return newPriorities;
        } catch (error) {
            console.log(error);
            throw new InternalServerError(
                'An error occurred while creating the priority.',
            );
        }
    }

    async getPrioritiesForSelect(
        data: IGetPriorityQueryParams,
    ): Promise<IPriorityResponse[]> {
        try {
            const priorities: IPriorityResponse[] = await this.model
                .find(data)
                .select('-createdAt -updatedAt -boardId');
            return priorities;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the priority.',
            );
        }
    }

    // async deleteByIds(ids: Schema.Types.ObjectId[]): Promise<any> {
    //     try {
    //         const deletedStages = await this.model.deleteMany({
    //             _id: { $in: ids },
    //         });
    //         return deletedStages;
    //     } catch (error) {
    //         throw new Error('An error occurred while creating the state.');
    //     }
    // }
}

export default PriorityRepository;
