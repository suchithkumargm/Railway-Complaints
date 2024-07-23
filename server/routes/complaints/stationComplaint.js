import express from 'express';
import { body, validationResult } from 'express-validator';

import fetchUser from '../../middleware/fetchUser.js';
import fetchManager from '../../middleware/fetchManager.js';
import {
  getAllStationComplaints,
  getUserStationComplaints,
  lodgeNewStationComplaint,
  deleteStationComplaint,
  updateStatusOfStationComplaint
} from '../../controllers/complaints/stationComplaintController.js';

const router = express.Router();

// ROUTE 1: Get All the stationComplaints using: GET "/complaints/stationcomplaints/getallcomplaints". manager Login required
router.get('/getallcomplaints', fetchManager, getAllStationComplaints);

// ROUTE 2: Get user stationComplaints using: GET "/complaints/stationcomplaints/getusercomplaints". user Login required
router.get('/getusercomplaints', fetchUser, getUserStationComplaints);

// ROUTE 3: Lodge a new complaint using: POST "/complaints/stationcomplaints/newcomplaint". Login required
router.post(
  '/newcomplaint',
  fetchUser,
  [
    body('stationName', 'Enter a valid station name').isLength({ min: 3 }),
    body('platformNumber', 'Enter a valid platform number').isLength({ min: 1 }),
    body('type', 'Type cannot be empty').isLength({ min: 1 }),
    body('subtype', 'Subtype cannot be empty').isLength({ min: 1 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  lodgeNewStationComplaint
);

// ROUTE 4: Delete an existing stationcomplaint using: DELETE "/complaints/stationcomplaints/deletecomplaint". user Login required
router.delete('/deletecomplaint/:id', fetchUser, deleteStationComplaint);

// ROUTE 5: Update status of station complaint using : PATCH "/complaints/stationcomplaints/updatestatus/:id". manager Login required
router.patch('/updatestatus/:id', fetchManager, updateStatusOfStationComplaint);

export default router;