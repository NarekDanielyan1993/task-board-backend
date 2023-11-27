import App from 'lib/app';
import MongoDb from 'lib/dbConnect';
import errorMiddleware from 'middleware/error';
import { ENV_VARIABLES } from './constant';
import routes from './route';

const app = new App(MongoDb.getInstance());

app.initializeMiddlewares();
app.initializeRoutes(routes);
app.addMiddleware(errorMiddleware);

app.init(ENV_VARIABLES.DATABASE_PORT);
