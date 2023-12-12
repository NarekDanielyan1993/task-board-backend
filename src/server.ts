import App from 'lib/app';
import MongoDb from 'lib/dbConnect';
import errorMiddleware from 'middleware/error';
import routes from './route';

const app = new App(MongoDb.getInstance());

app.initializeMiddlewares();
app.initializeRoutes(routes);
app.addMiddleware(errorMiddleware);

app.init(5000);
