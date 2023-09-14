import { Router } from 'express';

import trainComplaintRoute from './complaints/trainComplaint.js'; //the path to trainComplaints route
import stationComplaintRoute from './complaints/stationComplaint.js'; //the path to stationComplaints route
import parcelComplaintRoute from './complaints/parcelComplaint.js'; //the path to parcelComplaints route
import miscellaneousComplaintRoute from './complaints/miscellaneousComplaint.js'; //the path to miscellaneousComplaints route

const complaintsRouter = Router();

// Use the trainComplaint route for train-related complaint routes
complaintsRouter.use('/traincomplaints',trainComplaintRoute);

// Use the stationComplaint route for station-related complaint routes
complaintsRouter.use('/stationcomplaints',stationComplaintRoute);

// // Use the trainComplaint route for train-related complaint routes
complaintsRouter.use('/parcelComplaints', parcelComplaintRoute);

// // Use the stationComplaint route for station-related complaint routes
complaintsRouter.use('/miscellaneousComplaints', miscellaneousComplaintRoute);

export default complaintsRouter;