import TaskController from 'controller/task';
import express, { Router } from 'express';
import AttachmentModel from 'model/attachment';
import TaskModel from 'model/task';
import AttachmentRepository from 'repository/attachment';
import TaskRepository from 'repository/task';
import AttachmentService from 'service/attachment';
import { TaskService } from 'service/task';
import isAuth from 'utils/middleware';

const taskRepository = new TaskRepository(TaskModel);
const taskService = new TaskService(taskRepository);
const attachmentRepository = new AttachmentRepository(AttachmentModel);
const attachmentService = new AttachmentService(attachmentRepository);
const taskController = new TaskController(taskService, attachmentService);

const taskRoutes: Router = express.Router();

taskRoutes.get('/tasks/search', isAuth, taskController.searchTasks);
taskRoutes.get('/tasks', taskController.getTasks);
taskRoutes.post('/task', isAuth, taskController.createTask);
taskRoutes.post('/task/subtask', isAuth, taskController.createSubTask);
taskRoutes.put('/task', isAuth, taskController.updateTask);
taskRoutes.put('/tasks', isAuth, taskController.updateTasks);
taskRoutes.delete('/task', isAuth, taskController.deleteTask);

export default taskRoutes;
