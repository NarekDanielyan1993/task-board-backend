import { BASE_API } from 'constant';
import express from 'express';
import boardRoutes from './board';
import commentRoutes from './comment';
import priorityRoutes from './priority';
import stageRoutes from './stage';
import taskRoutes from './task';
import userRoutes from './user';

const routes = express.Router();

routes.use(BASE_API, priorityRoutes);
routes.use(BASE_API, boardRoutes);
routes.use(BASE_API, stageRoutes);
routes.use(BASE_API, taskRoutes);
routes.use(BASE_API, commentRoutes);
routes.use(BASE_API, userRoutes);

export default routes;
