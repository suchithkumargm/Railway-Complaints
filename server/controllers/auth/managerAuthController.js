import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Manager from '../../models/Manager.js';

dotenv.config();    // Load environment variables
const JWT_SECRET = process.env.JWT_SECRET;   // JWT secret string

// ROUTE 1: Register a manager on the website using: POST "/auth/manager/register". No login required
export const registerManager = async(req, res) =>{
    let success = false;
const errors = validationResult(req);

// If there are validation errors, return bad request and the errors
if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
}

try {
    // Check if a manager with the same employeeId already exists
    let manager = await Manager.findOne({ employeeId: req.body.employeeId });

    if (manager) {
        success = false;
        return res.status(400).json({ error: "Manager already exists on the website" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Register the manager in the database
    manager = await Manager.create({
        employeeId: req.body.employeeId,
        password: hashedPassword,
    });

    // Used for creating an authToken
    const data = {
        manager: {
            id: manager.id
        },
        role:'manager'
    }

    // Create an authentication token (JWT) for the new manager
    const authToken = jwt.sign(data, JWT_SECRET)

    // Successful registration of manager. Send authToken as a response
    success = true;
    res.json({ success, authToken });
} catch (error) {
    // Print errors if any
    console.error(error);
    res.status(500).send("Internal Server Error");
}
}

// ROUTE 2: Authenticate a manager using: POST "/auth/manager/login". No login required
export const loginManager = async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    // If there are validation errors, return bad request and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the employeeId and password from the request body
    const { employeeId, password } = req.body;

    try {
        // Find if the manager exists
        let manager = await Manager.findOne({ employeeId: employeeId });

        // If the manager doesn't exist, return an error
        if (!manager) {
            success = false;
            return res.status(400).json({ success, error: "Invalid credentials" })
        }

        // Compare the password using bcrypt method
        const passwordCompare = await bcrypt.compare(password, manager.password)

        // If incorrect password, produce an error
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Invalid user credentials" })
        }

        const data = {
            manager: {
                id: manager.id
            },
            role: 'manager', // Set the role to 'manager' for user tokens
        }

        // Create an authentication token (JWT) for the authenticated manager
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}