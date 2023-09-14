import { validationResult } from 'express-validator';
import MiscellaneousComplaint from '../../models/complaints/miscellaneousComplaint.js';

export const getAllMiscellaneousComplaints = async (req, res) => {
    try {
        const miscellaneousComplaints = await MiscellaneousComplaint.find();
        res.json(miscellaneousComplaints);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getUserMiscellaneousComplaints = async (req, res) => {
    try {
        const miscellaneousComplaints = await MiscellaneousComplaint.find({ user: req.user.id });
        res.json(miscellaneousComplaints);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const lodgeNewMiscellaneousComplaint = async (req, res) => {
    try {
        // Get all details from the body of the request
        const { timestamp, description } = req.body;

        // If there are errors, return a bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create an object of miscellaneous complaint
        const miscellaneousComplaint = new MiscellaneousComplaint({
            user: req.user.id,
            timestamp,
            description,
        });

        const savedComplaint = await miscellaneousComplaint.save();
        res.json(savedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteMiscellaneousComplaint = async (req, res) => {
    try {
        // Find the complaint to be deleted and delete it
        let miscellaneousComplaint = await MiscellaneousComplaint.findById(req.params.id);
        if (!miscellaneousComplaint) {
            return res.status(404).send('Not Found');
        }

        // Allow deletion only if the user has created this complaint
        if (miscellaneousComplaint.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        miscellaneousComplaint = await MiscellaneousComplaint.findByIdAndDelete(req.params.id);
        res.json({ Success: 'Miscellaneouscomplaint has been deleted', miscellaneousComplaint: miscellaneousComplaint });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};