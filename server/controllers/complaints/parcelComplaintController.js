import { validationResult } from 'express-validator';
import ParcelComplaint from '../../models/complaints/ParcelComplaint.js';

export const getAllParcelComplaints = async (req, res) => {
    try {
        const parcelComplaints = await ParcelComplaint.find();
        res.json(parcelComplaints);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getUserParcelComplaints = async (req, res) => {
    try {
        const parcelComplaints = await ParcelComplaint.find({ user: req.user.id });
        res.json(parcelComplaints);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const lodgeNewParcelComplaint = async (req, res) => {
    try {
        // Get all details from the body of the request
        const { parcelNumber, type, subtype, timestamp, description } = req.body;

        // If there are errors, return a bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create an object of parcel complaint
        const parcelComplaint = new ParcelComplaint({
            user: req.user.id,
            parcelNumber,
            type,
            subtype,
            timestamp,
            description,
            status: 'pending'
        });

        const savedComplaint = await parcelComplaint.save();
        res.json(savedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteParcelComplaint = async (req, res) => {
    try {
        // Find the complaint to be deleted and delete it
        let parcelComplaint = await ParcelComplaint.findById(req.params.id);
        if (!parcelComplaint) {
            return res.status(404).send('Not Found');
        }

        // Allow deletion only if the user has created this complaint
        if (parcelComplaint.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        parcelComplaint = await ParcelComplaint.findByIdAndDelete(req.params.id);
        res.json({ Success: 'Parcelcomplaint has been deleted', parcelComplaint: parcelComplaint });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateStatusOfParcelComplaint = async (req, res) => {
    try {
        // Find the complaint to be updated
        let parcelComplaint = await ParcelComplaint.findById(req.params.id);
        if (!parcelComplaint) {
            return res.status(404).send('Not Found');
        }

        // Update the status to 'completed'
        parcelComplaint.status = 'resolved';
        await parcelComplaint.save();

        res.json({ Success: 'Parcel complaint status has been updated to completed', parcelComplaint: parcelComplaint });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};