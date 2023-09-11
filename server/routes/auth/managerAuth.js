import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Manager from '../../models/Manager.js';

dotenv.config();    //.env configuration
const router = express.Router();    //create a express router which has all the req methods

const JWT_SECRET = process.env.JWT_SECRET;   //jwt secret string

// ROUTE 1: register a manager on the website using: POST "/auth/manager/register". No login required
router.post('/register', [
    body('employeeId', 'Enter a valid employee Id').isLength({ min: 5 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);   //validate the above conditions
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors });
    }
    // Check whether the manager with this email exists already
    try {
        let manager = await Manager.findOne({ employeeId: req.body.employeeId })
        if (manager) {
            // if manager already exists then return error msg
            success = false
            return res.status(400).json({ error: "Manager already exists on the website" })
        }
        //if manager doesn't exist already then register manager
        const salt = await bcrypt.genSalt(10);  //salt of length 20 for password
        const secPass = await bcrypt.hash(req.body.password, salt);     //hash the entered password with the generated salt
        //register the manager
        manager = await Manager.create({
            employeeId:req.body.employeeId,
            password: secPass
        });
        //used for creating a authToken
        const data = {
            manager: {
                id: manager.id
            }
        }
        //create a auth token using jwt
        const authToken = jwt.sign(data, JWT_SECRET)

        //successful registration of manager. send authToken as response
        success = true
        res.json({ success, authToken })
    } catch (error) {
        //print erros if any
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a manager using: POST "/auth/manager/login". No login required
router.post('/login', [
    body('employeeId', 'Enter a valid employee Id').isLength({min:5}),
    body('password', 'Password should be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);   //validate the input using above conditions
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //get the employeeId and password from the request body
    const { employeeId, password } = req.body;
    try {
        //find if the manager exists
        let manager = await Manager.findOne({ employeeId: employeeId })
        //if the manager doesn't exists then error
        if (!manager) {
            success = false
            return res.status(400).json({ success, error: "Invalid credentials" })
        }

        //compare the password using bcrypt method
        const passwordCompare = await bcrypt.compare(password, manager.password)
        //if incorrect password then produce error
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Invalid user credentials" })
        }

        const data = {
            manager: {
                id: manager.id
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

export default router;