import express from 'express';
import { body, validationResult } from 'express-validator';

import fetchUser from '../../middleware/fetchUser.js';
import fetchManager from '../../middleware/fetchManager.js';
import TrainComplaint from '../../models/complaints/TrainComplaint.js';

const router = express.Router();

// ROUTE 1: Get All the trainComplaints using: GET "/complaints/traincomplaints/getallcomplaints". manager Login required
router.get('/getallcomplaints', fetchManager, async (req, res) => {
    const trainComplaints = await TrainComplaint.find();
    res.json(trainComplaints);
})

// ROUTE 2: Get user trainComplaints using: GET "/complaints/traincomplaints/getusercomplaints". user Login required
router.get('/getusercomplaints', fetchUser, async (req, res) => {
    const trainComplaints = await TrainComplaint.find({user:req.user.id});
    res.json(trainComplaints);
})

//ROUTE 3:lodge a new complaint using: POST "/complaints/traincomplaints/newcomplaint". Login required
router.post('/newcomplaint', fetchUser, [
    body('trainNumber', 'Enter a valid train number').isLength({ min: 5 }),
    body('pnrNumber', 'Enter a valid pnr number').isLength({ min: 5 }),
    body('type', 'type can not be empty').isLength({ min: 1 }),
    body('subtype', 'sub type can not be empty').isLength({ min: 1 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        //get all details from body of request
        const { trainNumber, pnrNumber, type, subtype, timestamp, description } = req.body;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //create a object of train complaint
        const trainComplaint = new TrainComplaint({
            user: req.user.id,trainNumber, pnrNumber, type, subtype, timestamp, description
        })
        const savedComplaint = await trainComplaint.save()
        res.json(savedComplaint);

    } catch (error) {
        console.error();
        res.status(500).send("Internal Server Error");
    }
})

// // ROUTE 4: Delete an existing train  using: DELETE "/api/notes/deletenote". user or manager Login required
// router.delete('/deletenote/:id', fetchUser, async (req, res) => {
//     try {
//         // Find the note to be deleted and delete it
//         let note = await Note.findById(req.params.id);
//         if (!note) {
//             return res.status(404).send("Not Found");
//         }

//         // Allow deletion only if user owns this Note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         note = await Note.findByIdAndDelete(req.params.id)
//         res.json({ "Success": "Note has been deleted", note: note })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// })

export default router;