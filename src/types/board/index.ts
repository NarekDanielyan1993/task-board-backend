import { ParsedUrlQuery } from 'querystring';

export interface IBoardModel {
    name: string;
}

export interface IBoardCreate {
    name: string;
}

export type IGetBoardQueryParams = {
    boardId: string;
} & ParsedUrlQuery;

export interface IBoardResponse extends IBoardModel {
    id: string;
}

export interface IBoardService {
    createBoard(board: IBoardCreate): Promise<IBoardResponse>;
    getAllBoards(): Promise<IBoardResponse[]>;
    getBoardById(id: string): Promise<IBoardResponse | null>;
    updateBoardById(id: string, name: string): Promise<IBoardResponse | null>;
    deleteBoardById(id: string): Promise<IBoardResponse>;
}

export interface IBoardRepository {
    create(board: IBoardCreate): Promise<IBoardResponse>;
    getAll(): Promise<IBoardResponse[]>;
    getById(id: string): Promise<IBoardResponse | null>;
    updateById(id: string, name: string): Promise<IBoardResponse | null>;
    deleteById(id: string): Promise<IBoardResponse>;
}
