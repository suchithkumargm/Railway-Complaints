import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../models/User.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Route to create a new user
export const createUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            success = false;
            return res.status(400).json({ error: "Sorry, a user with this email already exists!" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user record in the database
        user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            mobile: req.body.mobile,
        });

        // Create an authentication token (JWT) for the new user
        const data = {
            user: {
                id: user.id,
            },
            role: 'user', // Set the role to 'user' for user tokens
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Route to authenticate a user
export const loginUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email: email });

        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Invalid user credentials" });
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            success = false;
            return res.status(400).json({ success, error: "Invalid user credentials" });
        }

        // Create an authentication token (JWT) for the authenticated user
        const data = {
            user: {
                id: user.id,
            },
            role:'user'
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Route to get user details (requires authentication)
export const getUser = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;

        // Retrieve user details from the database (excluding password)
        const user = await User.findById(userId).select("-password");

        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
