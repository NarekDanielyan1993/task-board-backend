import { NextFunction, Request, Response } from 'express';
import {
    IStageCreateBody,
    IStageService,
    IStageUpdatePositions,
} from 'types/stage';

export default class StageController {
    private stageService: IStageService;

    constructor(stateService: IStageService) {
        this.stageService = stateService;
    }

    createStage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stageData = req.body as IStageCreateBody;
            const newStage = await this.stageService.createStage([
                {
                    name: stageData.name,
                    color: stageData.color,
                    boardId: stageData.boardId,
                    listPosition: stageData.listPosition,
                },
            ]);
            if (stageData.updatedStagePositions) {
                const updatedStagePromise = stageData.updatedStagePositions.map(
                    (stage: IStageUpdatePositions) =>
                        this.stageService.updateById(stage.id, {
                            listPosition: stage.position,
                        }),
                );
                await Promise.all(updatedStagePromise);
            }
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
            const stageId = req.body;
            const deletedStage = await this.stageService.deleteStage(stageId);
            const stages = await this.stageService.getStagesByBoard(
                deletedStage.boardId,
            );
            if (deletedStage.listPosition <= stages.length) {
                await Promise.all(
                    stages
                        .filter(
                            (stage) =>
                                stage.listPosition > deletedStage.listPosition,
                        )
                        .map(
                            async (st) =>
                                await this.stageService.updateById(
                                    st._id.toString(),
                                    {
                                        listPosition: st.listPosition - 1,
                                    },
                                ),
                        ),
                );
            }
            res.status(200).json(deletedStage);
        } catch (error) {
            next(error);
        }
    };
}
