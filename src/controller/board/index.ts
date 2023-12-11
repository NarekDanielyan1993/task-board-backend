import { DEFAULT_PRIORITIES } from 'constant/common';
import { NextFunction, Request, Response } from 'express';
import {
    IBoardResponse,
    IBoardService,
    IGetBoardQueryParams,
} from 'types/board';
import { ICreatePriority, IPriorityService } from 'types/priority';
import { IStageResponse, IStageService } from 'types/stage';
import { ITaskService } from 'types/task';
import { isExist } from 'utils/helper';

export default class BoardController {
    private boardService: IBoardService;
    private stageService: IStageService;
    private priorityService: IPriorityService;
    private taskService: ITaskService;

    constructor(
        boardService: IBoardService,
        stageService: IStageService,
        priorityService: IPriorityService,
        taskService: ITaskService,
    ) {
        this.boardService = boardService;
        this.stageService = stageService;
        this.priorityService = priorityService;
        this.taskService = taskService;
    }

    public getAllBoards = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const boards = await this.boardService.getAllBoards();
            res.status(200).json(boards);
        } catch (error) {
            next(error);
        }
    };

    public getBoardById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { boardId } = req.query as IGetBoardQueryParams;
            const board = await this.boardService.getBoardById(boardId);
            if (!isExist(board)) {
                throw new Error('Board not found');
            }
            res.status(200).json(board);
        } catch (error) {
            next(error);
        }
    };

    public createBoard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { name } = req.body;

            const savedBoard: IBoardResponse =
                await this.boardService.createBoard({
                    name,
                });

            // const defaultStages: IStageCreate[] = DEFAULT_STAGES.map(
            //     (stage) => ({
            //         name: stage.name,
            //         boardId: savedBoard.id,
            //         listPosition: stage.position,

            //     }),
            // );

            // await this.stageService.createStage(defaultStages);

            const defaultPriorities: ICreatePriority[] = DEFAULT_PRIORITIES.map(
                (priority) => ({
                    name: priority.name,
                    boardId: savedBoard.id,
                }),
            );
            await this.priorityService.createPriorities(defaultPriorities);
            res.status(201).json(savedBoard);
        } catch (error) {
            next(error);
        }
    };

    public updateBoardById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedBoard = await this.boardService.updateBoardById(
                id,
                name,
            );
            res.status(200).json(updatedBoard);
        } catch (error) {
            next(error);
        }
    };

    public deleteBoard = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.body;
            await this.boardService.deleteBoardById(id);
            const deletedStages = await this.stageService.deleteStages({
                boardId: id,
            });
            const deletedStageIds = deletedStages.map(
                (stage: IStageResponse) => stage._id,
            );
            await this.taskService.deleteTasks({
                stageId: { $in: deletedStageIds },
            });
            await res.status(204).json({ msg: 'success' });
        } catch (error) {
            next(error);
        }
    };
}
