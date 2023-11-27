// routes/boardRoutes.ts
import { STAGE_API } from 'constant';
import StageController from 'controller/stage';
import express, { Router } from 'express';
import StateModel from 'model/stage';
import StageRepository from 'repository/stage';
import StageService from 'service/stage';
import isAuth from 'utils/middleware';

const stageRepository = new StageRepository(StateModel);
const stageService = new StageService(stageRepository);
const stageController = new StageController(stageService);

const stageRoutes: Router = express.Router();
stageRoutes.get(STAGE_API.GET_ALL, isAuth, stageController.getStagesByBoard);
stageRoutes.post(STAGE_API.CREATE, isAuth, stageController.createStage);
stageRoutes.delete(STAGE_API.DELETE, isAuth, stageController.deleteStage);

export default stageRoutes;
