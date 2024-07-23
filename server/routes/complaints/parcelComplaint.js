import express from 'express';
import { body } from 'express-validator';

import fetchUser from '../../middleware/fetchUser.js';
import fetchManager from '../../middleware/fetchManager.js';
import {
  getAllParcelComplaints,
  getUserParcelComplaints,
  lodgeNewParcelComplaint,
  deleteParcelComplaint,
  updateStatusOfParcelComplaint
} from '../../controllers/complaints/parcelComplaintController.js';

const router = express.Router();

// ROUTE 1: Get All the parcelComplaints using: GET "/complaints/parcelcomplaints/getallcomplaints". manager Login required
router.get('/getallcomplaints', fetchManager, getAllParcelComplaints);

// ROUTE 2: Get user parcelComplaints using: GET "/complaints/parcelcomplaints/getusercomplaints". user Login required
router.get('/getusercomplaints', fetchUser, getUserParcelComplaints);

// ROUTE 3: Lodge a new complaint using: POST "/complaints/parcelcomplaints/newcomplaint". Login required
router.post(
  '/newcomplaint',
  fetchUser,
  [
    body('parcelNumber', 'parcel number should be minimum 3 characters').isLength({ min: 3 }),
    body('type', 'Type cannot be empty').isLength({ min: 1 }),
    body('subtype', 'Subtype cannot be empty').isLength({ min: 1 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  lodgeNewParcelComplaint
);

// ROUTE 4: Delete an existing parcelcomplaint using: DELETE "/complaints/parcelcomplaints/deletecomplaint". user Login required
router.delete('/deletecomplaint/:id', fetchUser, deleteParcelComplaint);

// ROUTE 5: Update status of parcel complaint using : PATCH "/complaints/parcelcomplaints/updatestatus/:id". manager Login required
router.patch('/updatestatus/:id', fetchManager, updateStatusOfParcelComplaint);

export default router;