import express from 'express';
import { body } from 'express-validator';

import { registerManager, loginManager } from '../../controllers/auth/managerAuthController.js';

const router = express.Router();

// ROUTE 1: Register a manager using: POST "/auth/manager/register". No login required
router.post(
    '/register',
    [
        body('employeeId', 'Enter a valid employee Id').isLength({ min: 5 }),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    ],
    registerManager
);

// ROUTE 2: Authenticate a manager using: POST "/auth/manager/login". No login required
router.post(
    '/login',
    [
        body('employeeId', 'Enter a valid employee Id').isLength({ min: 5 }),
        body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
    ],
    loginManager
);

export default router;
