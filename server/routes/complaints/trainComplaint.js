import express from 'express';
import { body, validationResult } from 'express-validator';

import fetchuser from '../middleware/fetchUser.js';
import TrainComplaint from '../models/TrainComplaint.js';

const router = express.Router();

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

// ROUTE 2: lodge a new complaint using: POST "/complaints/add/traincomplaint". user Login required
router.post('/add/traincomplaint', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
})