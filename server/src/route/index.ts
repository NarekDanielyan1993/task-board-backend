import { BASE_API } from 'constant/api';
import express from 'express';
import productRoutes from './product';

const routes = express.Router();

routes.use(BASE_API, productRoutes);

export default routes;
