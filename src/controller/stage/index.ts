import { NextFunction, Request, Response } from 'express';
import { IStageService } from 'types/stage';

export default class StageController {
    private stageService: IStageService;

    constructor(stateService: IStageService) {
        this.stageService = stateService;
    }

    createStage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stages = req.body;
            const newStage = await this.stageService.createStage(stages);
            res.status(201).json(newStage);
        } catch (error) {
            next(error);
        }
    };

    getStagesByBoard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.query as { id: string };
            const stages = await this.stageService.getStagesByBoard(id);
            res.status(201).json(stages);
        } catch (error) {
            next(error);
        }
    };

    deleteStage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stages = req.body;
            const deletedStage = await this.stageService.deleteStage(stages);
            res.status(200).json(deletedStage);
        } catch (error) {
            next(error);
        }
    };
}
