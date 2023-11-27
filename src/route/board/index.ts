// routes/boardRoutes.ts
import { BOARD_API } from 'constant';
import BoardController from 'controller/board';
import express, { Router } from 'express';
import BoardModel from 'model/board';
import PriorityModel from 'model/priority';
import StageModel from 'model/stage';
import TaskModel from 'model/task';
import passport from 'passport';
import BoardRepository from 'repository/board';
import PriorityRepository from 'repository/priority';
import StageRepository from 'repository/stage';
import TaskRepository from 'repository/task';
import BoardService from 'service/board';
import PriorityService from 'service/priority';
import StageService from 'service/stage';
import TaskService from 'service/task';

const stageRepository = new StageRepository(StageModel);
const stageService = new StageService(stageRepository);
const taskRepository = new TaskRepository(TaskModel);
const taskService = new TaskService(taskRepository);
const priorityRepository = new PriorityRepository(PriorityModel);
const priorityService = new PriorityService(priorityRepository);
const boardRepository = new BoardRepository(BoardModel);
const boardService = new BoardService(boardRepository);
const boardController = new BoardController(
    boardService,
    stageService,
    priorityService,
    taskService,
);

const boardRoutes: Router = express.Router();

boardRoutes.get(
    BOARD_API.GET_ALL,
    passport.authenticate('jwt', { session: false }),
    boardController.getAllBoards,
);

boardRoutes.get(
    BOARD_API.GET_SINGLE,
    passport.authenticate('jwt', { session: false }),
    boardController.getBoardById,
);

boardRoutes.post(
    BOARD_API.CREATE,
    passport.authenticate('jwt', { session: false }),
    boardController.createBoard,
);

boardRoutes.delete(
    BOARD_API.DELETE,
    passport.authenticate('jwt', { session: false }),
    boardController.deleteBoard,
);

export default boardRoutes;
