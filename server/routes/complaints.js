import { Router } from 'express';

import trainComplaintRoute from './complaints/trainComplaint.js'; //the path to trainComplaints route
// import stationComplaintRoute from './complaints/trainComplaint.js'; //the path to stationComplaints route
// import parcelComplaintRoute from './complaints/trainComplaint.js'; //the path to parcelComplaints route
// import miscellaneousComplaintRoute from './complaints/trainComplaint.js'; //the path to miscellaneousComplaints route

const complaintsRouter = Router();

// Use the trainComplaint route for train-related complaint routes
complaintsRouter.use('/trainComplaints', trainComplaintRoute);

// // Use the stationComplaint route for station-related complaint routes
// authRouter.use('/stationComplaint', stationComplaintRoute);

// // Use the trainComplaint route for train-related complaint routes
// authRouter.use('/parcelComplaint', parcelComplaintRoute);

// // Use the stationComplaint route for station-related complaint routes
// authRouter.use('/miscellaneousComplaint', miscellaneousComplaintRoute);

export default complaintsRouter;