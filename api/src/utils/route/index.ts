import express, { Router } from 'express';

export class RouteSetup {
    private expressApp: express.Express;

    constructor(app: express.Express) {
        this.expressApp = app;
    }

    public setupInitialRoutes(routes: Router) {
        this.expressApp.use(routes);
    }
}
