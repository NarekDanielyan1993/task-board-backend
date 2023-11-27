// routes/boardRoutes.ts
import { GOOGLE_FAILURE_REDIRECT_ROUTE, USER_API } from 'constant';
import UserController from 'controller/user';
import express, { Router } from 'express';
import UserModel from 'model/user';
import passport from 'passport';
import UserRepository from 'repository/user';
import UserService from 'service/user';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRoutes: Router = express.Router();
userRoutes.post(USER_API.SIGN_UP, userController.createUser);
userRoutes.get(USER_API.EMAIL_VERIFICATION, userController.verifyEmail);
userRoutes.post(USER_API.LOGIN, userController.login);
userRoutes.put(USER_API.UPDATE_ACCESS_TOKEN, userController.updateAccessToken);
userRoutes.get(
    USER_API.LOGIN_GOOGLE,
    passport.authenticate('google', {
        scope: ['profile'],
    }),
);
userRoutes.get(
    USER_API.LOGIN_GOOGLE_REDIRECT,
    passport.authenticate('google', {
        failureRedirect: GOOGLE_FAILURE_REDIRECT_ROUTE,
        session: false,
        prompt: 'consent',
    }),
    userController.authenticateWithGoogle,
);

userRoutes.post(USER_API.LOG_OUT, userController.logout);
userRoutes.post(USER_API.RESET_PASSWORD, userController.resetPassword);
userRoutes.post(USER_API.UPDATE_PASSWORD, userController.updatePassword);

export default userRoutes;
