import {
    IAccountCreate,
    IAccountRepository,
    IAccountResponse,
    IAccountService,
} from 'types/index.js';

export class AccountService implements IAccountService {
    private accountRepository: IAccountRepository;

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository;
    }

    async createAccount(
        accountData: IAccountCreate,
    ): Promise<IAccountResponse> {
        return await this.accountRepository.create(accountData);
    }

    async findAccountOrCreate(
        profileId: string,
        accountData: IAccountCreate,
    ): Promise<IAccountResponse> {
        return await this.accountRepository.findOrCreate(
            profileId,
            accountData,
        );
    }

    // async getTasks() {
    //     return this.taskRepository.findAll();
    // }

    // async getTaskById(taskId) {
    //     return this.taskRepository.findById(taskId);
    // }

    // async updateById(
    //     taskId: Types.ObjectId,
    //     taskData: ITaskUpdate,
    //     options: QueryOptions,
    // ): Promise<ITaskResponse | null> {
    //     return this.taskRepository.updateById(taskId, taskData, options);
    // }

    // async deleteTask(taskId: string): Promise<ITaskDeleteResponse> {
    //     return await this.taskRepository.delete(taskId);
    // }
}

export default AccountService;
