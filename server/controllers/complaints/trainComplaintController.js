import { validationResult } from 'express-validator';
import TrainComplaint from '../../models/complaints/TrainComplaint.js';

export const getAllTrainComplaints = async (req, res) => {
  try {
    const trainComplaints = await TrainComplaint.find();
    res.json(trainComplaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUserTrainComplaints = async (req, res) => {
  try {
    const trainComplaints = await TrainComplaint.find({ user: req.user.id });
    res.json(trainComplaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const lodgeNewTrainComplaint = async (req, res) => {
  try {
    // Get all details from the body of the request
    const { trainNumber, pnrNumber, type, subtype, timestamp, description } = req.body;

    // If there are errors, return a bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create an object of train complaint
    const trainComplaint = new TrainComplaint({
      user: req.user.id,
      trainNumber,
      pnrNumber,
      type,
      subtype,
      timestamp,
      description,
      status: 'pending'
    });

    const savedComplaint = await trainComplaint.save();
    res.json(savedComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteTrainComplaint = async (req, res) => {
  try {
    // Find the complaint to be deleted and delete it
    let trainComplaint = await TrainComplaint.findById(req.params.id);
    if (!trainComplaint) {
      return res.status(404).send('Not Found');
    }

    // Allow deletion only if the user has created this complaint
    if (trainComplaint.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed');
    }

    trainComplaint = await TrainComplaint.findByIdAndDelete(req.params.id);
    res.json({ Success: 'Traincomplaint has been deleted', trainComplaint: trainComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const updateStatusOfTrainComplaint = async (req, res) => {
  try {
    // Find the complaint to be updated
    let trainComplaint = await TrainComplaint.findById(req.params.id);
    if (!trainComplaint) {
      return res.status(404).send('Not Found');
    }

    // Update the status to 'completed'
    trainComplaint.status = 'resolved';
    await trainComplaint.save();

    res.json({ Success: 'Train complaint status has been updated to completed', trainComplaint: trainComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
