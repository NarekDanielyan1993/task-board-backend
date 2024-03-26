import {
    FilterQuery,
    QueryOptions,
    QuerySelector,
    Types,
    UpdateQuery,
} from 'mongoose';
import {
    ITaskCreate,
    ITaskModel,
    ITaskRepository,
    ITaskResponse,
    ITaskSearch,
    ITaskService,
    ITaskUpdate,
} from 'types/index.js';

export class TaskService implements ITaskService {
    private taskRepository: ITaskRepository;

    constructor(taskRepository: ITaskRepository) {
        this.taskRepository = taskRepository;
    }

    async createTask(taskData: ITaskCreate): Promise<ITaskResponse> {
        return await this.taskRepository.create(taskData);
    }

    async searchBySummary(searchData: ITaskSearch): Promise<any> {
        return await this.taskRepository.searchBySummary(searchData);
    }

    async getTasks() {
        return await this.taskRepository.findAll();
    }

    async updateById(
        taskId: Types.ObjectId,
        taskData: ITaskUpdate,
        options: QueryOptions,
    ): Promise<ITaskResponse | null> {
        return this.taskRepository.updateById(taskId, taskData, options);
    }

    async updateTasks(
        filter: FilterQuery<ITaskModel>,
        taskData: UpdateQuery<ITaskModel>,
        options: QueryOptions,
    ): Promise<ITaskModel | null> {
        return await this.taskRepository.update(filter, taskData, options);
    }

    async deleteTask(taskId: string): Promise<ITaskResponse | null> {
        return await this.taskRepository.delete(taskId);
    }

    async deleteTasks(data: QuerySelector<ITaskModel>): Promise<ITaskResponse> {
        return await this.taskRepository.deleteMany(data);
    }
}

export default TaskService;
