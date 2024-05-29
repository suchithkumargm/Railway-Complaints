import { Router } from 'express';
import userAuthRoute from './auth/userAuth.js'; //the path to userAuth route
import managerAuthRoute from './auth/managerAuth.js'; //the path to managerAuth route

const authRouter = Router();

// Use the userAuthRoute for user-related authentication routes
authRouter.use('/user', userAuthRoute);

// Use the managerAuthRoute for manager-related authentication routes
authRouter.use('/manager', managerAuthRoute);

export default authRouter;