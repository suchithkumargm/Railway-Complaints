import { validationResult } from 'express-validator';
import StationComplaint from '../../models/complaints/stationComplaint.js';

export const getAllStationComplaints = async (req, res) => {
  try {
    const stationComplaints = await StationComplaint.find();
    res.json(stationComplaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUserStationComplaints = async (req, res) => {
  try {
    const stationComplaints = await StationComplaint.find({ user: req.user.id });
    res.json(stationComplaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const lodgeNewStationComplaint = async (req, res) => {
  try {
    // Get all details from the body of the request
    const { stationName, platformNumber, type, subtype, timestamp, description } = req.body;
    
    // If there are errors, return a bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create an object of station complaint
    const stationComplaint = new StationComplaint({
      user: req.user.id,
      stationName,
      platformNumber,
      type,
      subtype,
      timestamp,
      description,
    });

    const savedComplaint = await stationComplaint.save();
    res.json(savedComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteStationComplaint = async (req, res) => {
  try {
    // Find the complaint to be deleted and delete it
    let stationComplaint = await StationComplaint.findById(req.params.id);
    if (!stationComplaint) {
      return res.status(404).send('Not Found');
    }

    // Allow deletion only if the user has created this complaint
    if (stationComplaint.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    stationComplaint = await StationComplaint.findByIdAndDelete(req.params.id);
    res.json({ Success: 'Stationcomplaint has been deleted', stationComplaint: stationComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};