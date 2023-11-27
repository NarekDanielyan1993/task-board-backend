import bcrypt from 'bcryptjs';
import {
    IUserCreate,
    IUserRepository,
    IUserResponse,
    IUserService,
} from 'types/user';
import Config from 'utils/config';

class UserService implements IUserService {
    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    public createUser = async (
        userData: IUserCreate,
    ): Promise<IUserResponse> => {
        const createdUser: IUserResponse =
            await this.repository.create(userData);
        return createdUser;
    };

    async isEmailExists(email: string): Promise<boolean> {
        const user = await this.repository.find({ email });
        return !!user;
    }

    async verifyEmail(id: string): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.updateOne(
            { _id: id },
            { verifiedEmail: new Date().toISOString() },
        );
        return updatedUser;
    }

    async updatePassword(
        id: string,
        password: string,
    ): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.updateOne(
            { _id: id },
            { password },
        );
        return updatedUser;
    }

    async findByEmail(email: string): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.findOne({ email });
        return updatedUser;
    }

    async findById(id: string): Promise<IUserResponse | null> {
        const updatedUser = await this.repository.findOne({ _id: id });
        return updatedUser;
    }

    async encryptPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await bcrypt.hash(
                password,
                Number(Config.getEnv('HASH_SAULT')),
            );
            return hashedPassword;
        } catch (error) {
            throw new Error('Error encrypting password');
        }
    }

    async verifyPassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (error) {
            throw new Error('Error verifying password');
        }
    }

    // public updateBoardById = async (
    //     id: string,
    //     name: string,
    // ): Promise<IBoardResponse | null> =>
    //     await this.repository.updateById(id, name);

    // public deleteBoardById = async (id: string): Promise<IBoardResponse> =>
    //     await this.repository.deleteById(id);
}

export default UserService;
