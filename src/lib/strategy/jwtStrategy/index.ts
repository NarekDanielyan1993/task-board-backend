import passport from 'passport';
import PassportJwt, { StrategyOptions } from 'passport-jwt';
import Config from 'utils/config';

const opts: StrategyOptions = {
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.getEnv('ACCESS_TOKEN_KEY'),
    // issuer: Config.getEnv('CLIENT_BASE_URL'),
};

export default passport.use(
    new PassportJwt.Strategy(opts, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            // const userService = new UserService(new UserRepository(UserModel));
            // const user = await userService.findById(jwt_payload.id);
            // if (!user) {
            //     done(null, false);
            //     return;
            // }
            return done(null, true);
        } catch (error) {
            return done(error, false);
        }
    }),
);
