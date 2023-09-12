import express from 'express';
import { body } from 'express-validator';

import { createUser, loginUser, getUser } from '../../controllers/auth/userAuthController.js';
import fetchUser from '../../middleware/fetchUser.js';

const router = express.Router();

// ROUTE 1: Create a User using: POST "/auth/user/createuser". No login required
router.post(
    '/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
        body('mobile', 'Mobile number must be 10 digits').isLength({ min: 10 }),
    ],
    createUser
);

// ROUTE 2: Authenticate a User using: POST "/auth/user/login". No login required
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
    ],
    loginUser
);

// ROUTE 3: Get logged-in User Details using: POST "/auth/user/getuser". Login required
// pass the authToken in the req header to fetch the user
router.post('/getuser', fetchUser, getUser);

export default router;