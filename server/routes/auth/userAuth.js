import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../models/User.js';
import fetchUser from '../../middleware/fetchUser.js';

dotenv.config();    //.env configuration
const router = express.Router();    //create a express router which has all the req methods

const JWT_SECRET = process.env.JWT_SECRET;   //jwt secret string 

// ROUTE 1: Create a User using: POST "/auth/createuser". No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('mobile', 'Mobile number must be 10 digits').isLength({ min: 10 }),
], async (req, res) => {

    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);   //validate the above conditions
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            // if user already exists then return error msg
            success = false
            return res.status(400).json({ error: "Sorry a user with this email already exists!" })
        }
        //if user doesn't exist already then create a new user
        const salt = await bcrypt.genSalt(10);  //salt of length 20 for password
        const secPass = await bcrypt.hash(req.body.password, salt);     //hash the entered password with the generated salt
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            mobile: req.body.mobile
        });
        //used for creating a authToken
        const data = {
            user: {
                id: user.id
            }
        }
        //create a auth token using jwt
        const authToken = jwt.sign(data, JWT_SECRET)

        //successful user creation. send authToken as response
        success = true
        res.json({ success, authToken })
    } catch (error) {
        //print erros if any
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/auth/userlogin". No login required
router.post('/userlogin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank and should be atleast 5 characters').exists().isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);   //validate the input using above conditions
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //get the email and password from the request body
    const { email, password } = req.body;
    try {
        //find if the user exists
        let user = await User.findOne({ email: email })
        //if the user doesn't exists then error
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Invalid user credentials" })
        }

        //compare the password using bcrypt method
        const passwordCompare = await bcrypt.compare(password, user.password)
        //if incorrect password then produce error
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Invalid user credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        //create a auth token using jwt
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Get loggedin User Details using: POST "/auth/getuser". Login required
// pass the authToken in the req header to fetch the user
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

export default router;