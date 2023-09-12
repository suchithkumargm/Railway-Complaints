import express from 'express';
import { body, validationResult } from 'express-validator';

import fetchUser from '../../middleware/fetchUser.js';
import fetchManager from '../../middleware/fetchManager.js';
import {
  getAllTrainComplaints,
  getUserTrainComplaints,
  lodgeNewTrainComplaint,
  deleteTrainComplaint,
} from '../../controllers/complaints/trainComplaintController.js';

const router = express.Router();

// ROUTE 1: Get All the trainComplaints using: GET "/complaints/traincomplaints/getallcomplaints". manager Login required
router.get('/getallcomplaints', fetchManager, getAllTrainComplaints);

// ROUTE 2: Get user trainComplaints using: GET "/complaints/traincomplaints/getusercomplaints". user Login required
router.get('/getusercomplaints', fetchUser, getUserTrainComplaints);

// ROUTE 3: Lodge a new complaint using: POST "/complaints/traincomplaints/newcomplaint". Login required
router.post(
  '/newcomplaint',
  fetchUser,
  [
    body('trainNumber', 'Enter a valid train number').isLength({ min: 5 }),
    body('pnrNumber', 'Enter a valid pnr number').isLength({ min: 5 }),
    body('type', 'Type cannot be empty').isLength({ min: 1 }),
    body('subtype', 'Subtype cannot be empty').isLength({ min: 1 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  lodgeNewTrainComplaint
);

// ROUTE 4: Delete an existing traincomplaint using: DELETE "/complaints/traincomplaints/deletecomplaint". user Login required
router.delete('/deletecomplaint/:id', fetchUser, deleteTrainComplaint);

export default router;