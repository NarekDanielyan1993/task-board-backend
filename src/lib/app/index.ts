import compression from 'compression';
import { corsOptions } from 'constant';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Router } from 'express';
import helmet from 'helmet';
import Database from 'lib/dbConnect';
import 'lib/strategy';
import passport from 'passport';

class App {
    private expressApp: Express;
    private db: Database;

    constructor(db: Database) {
        this.expressApp = express();
        this.db = db;
    }

    public initializeMiddlewares() {
        this.expressApp.use(compression());
        this.expressApp.use(
            express.urlencoded({ limit: '25mb', extended: true }),
        );
        // this.expressApp.use(morgan('dev'));
        // this.expressApp.use(credentials);
        this.expressApp.use(express.json({ limit: '25mb' }));
        this.expressApp.use(helmet());
        this.expressApp.use(cookieParser());
        this.expressApp.use(cors(corsOptions));
        this.expressApp.use(passport.initialize());
    }

    public initializeRoutes(routes: Router) {
        this.expressApp.use(routes);
    }

    public addMiddleware(middleware: any) {
        this.expressApp.use(middleware);
    }

    public addRoute(router: express.Router) {
        this.expressApp.use(router);
    }

    public async init(port: number) {
        try {
            await this.db.connect();
            this.expressApp.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    }

    public getApp(): Express {
        return this.expressApp;
    }
}

export default App;
