import express from 'express';
import { body} from 'express-validator';

import fetchUser from '../../middleware/fetchUser.js';
import fetchManager from '../../middleware/fetchManager.js';
import {
  getAllMiscellaneousComplaints,
  getUserMiscellaneousComplaints,
  lodgeNewMiscellaneousComplaint,
  deleteMiscellaneousComplaint,
} from '../../controllers/complaints/miscellaneousComplaintController.js';

const router = express.Router();

// ROUTE 1: Get All the miscellaneousComplaints using: GET "/complaints/miscellaneouscomplaints/getallcomplaints". manager Login required
router.get('/getallcomplaints', fetchManager, getAllMiscellaneousComplaints);

// ROUTE 2: Get user miscellaneousComplaints using: GET "/complaints/miscellaneouscomplaints/getusercomplaints". user Login required
router.get('/getusercomplaints', fetchUser, getUserMiscellaneousComplaints);

// ROUTE 3: Lodge a new complaint using: POST "/complaints/miscellaneouscomplaints/newcomplaint". Login required
router.post(
  '/newcomplaint',
  fetchUser,
  [
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  lodgeNewMiscellaneousComplaint
);

// ROUTE 4: Delete an existing miscellaneouscomplaint using: DELETE "/complaints/miscellaneouscomplaints/deletecomplaint". user Login required
router.delete('/deletecomplaint/:id', fetchUser, deleteMiscellaneousComplaint);

export default router;