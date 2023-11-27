import BoardRepository from 'repository/board';
import { IBoardCreate, IBoardResponse, IBoardService } from 'types/board';

class BoardService implements IBoardService {
    private repository: BoardRepository;

    constructor(repository: BoardRepository) {
        this.repository = repository;
    }

    public createBoard = async (
        board: IBoardCreate,
    ): Promise<IBoardResponse> => {
        const createdBoard: IBoardResponse =
            await this.repository.create(board);
        return createdBoard;
    };

    public getAllBoards = async (): Promise<IBoardResponse[]> =>
        await this.repository.getAll();

    public getBoardById = async (
        boardId: string,
    ): Promise<IBoardResponse | null> =>
        (await this.repository.getById(boardId)) as IBoardResponse;

    public updateBoardById = async (
        id: string,
        name: string,
    ): Promise<IBoardResponse | null> =>
        await this.repository.updateById(id, name);

    public deleteBoardById = async (id: string): Promise<IBoardResponse> =>
        await this.repository.deleteById(id);
}

export default BoardService;
