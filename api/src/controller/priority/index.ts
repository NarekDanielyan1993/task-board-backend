import { NextFunction, Request, Response } from 'express';
import { IGetPriorityQueryParams, IPriorityService } from 'types/priority';

class PriorityController {
    private priorityService: IPriorityService;

    constructor(priorityService: IPriorityService) {
        this.priorityService = priorityService;
    }

    public createPriority = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = req.body;
            const newPriority = await this.priorityService.createPriority(data);
            res.status(201).json(newPriority);
        } catch (error) {
            next(error);
        }
    };

    public getPrioritiesForSelect = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const data = req.query as IGetPriorityQueryParams;
            console.log(data);
            const priorities =
                await this.priorityService.getPrioritiesForSelect(data);
            console.log(priorities);
            res.status(201).json(priorities);
        } catch (error) {
            next(error);
        }
    };
}

export default PriorityController;
