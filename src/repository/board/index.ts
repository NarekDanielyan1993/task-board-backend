import { InternalServerError, NotFound } from 'lib/error';
import { Model } from 'mongoose';
import {
    IBoardCreate,
    IBoardModel,
    IBoardRepository,
    IBoardResponse,
} from 'types/board';

class BoardRepository implements IBoardRepository {
    private model: Model<IBoardModel>;

    constructor(model: Model<IBoardModel>) {
        this.model = model;
    }

    async create(board: IBoardCreate): Promise<IBoardResponse> {
        try {
            return (await this.model.create(board)) as IBoardResponse;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while creating the board.',
            );
        }
    }

    async getAll(): Promise<IBoardResponse[]> {
        try {
            const boards = (await this.model.find()) as IBoardResponse[];
            return boards;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while fetching boards.',
            );
        }
    }

    async getById(boardId: string): Promise<IBoardResponse | null> {
        try {
            const board: IBoardResponse = (await this.model.findOne({
                _id: boardId,
            })) as IBoardResponse;
            return board;
        } catch (error) {
            console.log('get board error: ', error);
            throw new InternalServerError(
                'An error occurred while fetching the board.',
            );
        }
    }

    async updateById(id: string, name: string): Promise<IBoardResponse | null> {
        try {
            const updatedBoard = (await this.model.findByIdAndUpdate(
                id,
                { name },
                { new: true },
            )) as IBoardResponse;
            if (!updatedBoard) {
                throw new NotFound('Board not found.');
            }
            return updatedBoard;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while updating the board.',
            );
        }
    }

    async deleteById(id: string): Promise<IBoardResponse> {
        try {
            const deletedBoard = (await this.model.findByIdAndRemove(
                id,
            )) as IBoardResponse;
            if (!deletedBoard) {
                throw new NotFound('Board not found.');
            }
            return deletedBoard;
        } catch (error) {
            throw new InternalServerError(
                'An error occurred while deleting the board.',
            );
        }
    }
}

export default BoardRepository;
