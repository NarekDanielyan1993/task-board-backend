import {
    ICreatePriority,
    IGetPriorityQueryParams,
    IPriorityRepository,
    IPriorityResponse,
    IPriorityService,
} from 'types/priority';

class PriorityService implements IPriorityService {
    private repository: IPriorityRepository;

    constructor(repository: IPriorityRepository) {
        this.repository = repository;
    }

    async createPriority(
        priority: ICreatePriority,
    ): Promise<IPriorityResponse> {
        return await this.repository.create(priority);
    }

    async createPriorities(
        priorities: ICreatePriority[],
    ): Promise<IPriorityResponse[]> {
        return await this.repository.createMultiple(priorities);
    }

    async getPrioritiesForSelect(
        data: IGetPriorityQueryParams,
    ): Promise<IPriorityResponse[]> {
        return await this.repository.getPrioritiesForSelect(data);
    }

    // async deleteByIds(ids: Schema.Types.ObjectId[]): Promise<IStageResponse[]> {
    //     return await this.repository.deleteByIds(ids);
    // }
}

export default PriorityService;
