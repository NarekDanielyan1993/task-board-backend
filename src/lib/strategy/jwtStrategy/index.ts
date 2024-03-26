import { NotAuthorized } from 'lib/error';
import passport from 'passport';
import PassportJwt, { StrategyOptions } from 'passport-jwt';
import Config from 'utils/config';

const opts: StrategyOptions = {
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.getEnv('ACCESS_TOKEN_KEY'),
};

export default passport.use(
    new PassportJwt.Strategy(opts, async (jwt_payload, done) => {
        try {
            return done(null, true);
        } catch (error) {
            const err = new NotAuthorized();
            return done(err, false);
        }
    }),
);
