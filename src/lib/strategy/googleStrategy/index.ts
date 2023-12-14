import { BASE_API, USER_API } from 'constant/api';
import { SESSION_PROVIDERS } from 'constant/auth';
import AccountModel from 'model/account';
import passport from 'passport';
import GoogleStrategy, {
    Profile,
    StrategyOptionsWithRequest,
} from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import AccountRepository from 'repository/account';
import AccountService from 'service/account';
import Config from 'utils/config';
import { isExist } from 'utils/helper';

const settings: StrategyOptionsWithRequest = {
    passReqToCallback: true,
    clientID: Config.getEnv('GOOGLE_CLIENT_ID'),
    clientSecret: Config.getEnv('GOOGLE_CLIENT_SECRET'),
    callbackURL: `${Config.getEnv('SERVER_BASE_URL')}${BASE_API}${
        USER_API.LOGIN_GOOGLE_REDIRECT
    }`,
};

export default passport.use(
    new GoogleStrategy.Strategy(settings, async function (
        _,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifiedCallback,
    ) {
        try {
            const accountService = new AccountService(
                new AccountRepository(AccountModel),
            );
            const account = await accountService.findAccountOrCreate(
                profile.id,
                {
                    provider: SESSION_PROVIDERS.GOOGLE,
                    providerId: profile.id,
                },
            );

            if (!isExist(account)) {
                const error = new Error(
                    'An error occurred while creating the User.',
                );
                cb(error, false);
                return;
            }
            cb(null, account);
        } catch (error) {
            console.log(error);
            cb(error, false);
        }
    }),
);
