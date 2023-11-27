// import ExtractJwt from 'passport-jwt/ExtractJwt';
// import JwtStrategy from 'passport-jwt/lib/strategy';
// import Config from 'utils/config';
// // import user from "service/"
// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: Config.getEnv('AUT_SECRET_KEY'),
//     algorithms: ['RS256'],
// };

// const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
//     // Your verification logic here
//     try {
//         // Example: Check if the user exists in the database
//         const user = await findUserById(payload.sub);

//         if (user) {
//             return done(null, user);
//         }
//         return done(null, false);
//     } catch (error) {
//         return done(error, false);
//     }
// });

// export default jwtStrategy;
