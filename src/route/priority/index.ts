// routes/boardRoutes.ts
import { PRIORITY_API } from 'constant/api';
import PriorityController from 'controller/priority';
import express, { Router } from 'express';
import PriorityModel from 'model/priority';
import PriorityRepository from 'repository/priority';
import PriorityService from 'service/priority';
import isAuth from 'utils/middleware';

const priorityRepository = new PriorityRepository(PriorityModel);
const priorityService = new PriorityService(priorityRepository);
const priorityRoutes: Router = express.Router();
const priorityController = new PriorityController(priorityService);
priorityRoutes.get(
    PRIORITY_API.GET_ALL,
    isAuth,
    priorityController.getPrioritiesForSelect,
);
priorityRoutes.post(
    PRIORITY_API.CREATE,
    isAuth,
    priorityController.createPriority,
);
// priorityRoute.delete(BOARD_API.DELETE, priorityController.deleteBoard);

export default priorityRoutes;
