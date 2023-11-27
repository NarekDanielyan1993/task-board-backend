import {
    IVerificationTokenCreate,
    IVerificationTokenRepository,
    IVerificationTokenResponse,
    IVerificationTokenService,
} from 'types/verificationToken';

class VerificationService implements IVerificationTokenService {
    private repository: IVerificationTokenRepository;

    constructor(repository: IVerificationTokenRepository) {
        this.repository = repository;
    }

    public createToken = async (
        tokenData: IVerificationTokenCreate,
    ): Promise<IVerificationTokenResponse> => {
        const createdToken: IVerificationTokenResponse =
            await this.repository.createOrUpdate(tokenData);
        return createdToken;
    };

    public getByIdentifier = async (
        id: string,
    ): Promise<IVerificationTokenResponse | null> =>
        await this.repository.findOne({ identifier: id });

    public isTokenValid(userToken: string, verificationToken: string): boolean {
        return userToken === verificationToken;
    }

    public isTokenExpired(
        userTokenExpiration: number,
        verificationTokenExpiration: Date,
    ): boolean {
        const verificationTokenExpirationTimestamp =
            new Date(verificationTokenExpiration).getTime() / 1000;
        return verificationTokenExpirationTimestamp < userTokenExpiration;
    }

    public deleteVerificationToken = async (
        id: string,
    ): Promise<IVerificationTokenResponse | null> =>
        await this.repository.deleteOne({ _id: id });

    public deleteVerificationTokenByIdentifier = async (
        identifier: string,
    ): Promise<IVerificationTokenResponse | null> =>
        await this.repository.deleteOne({ identifier });
}

export default VerificationService;
