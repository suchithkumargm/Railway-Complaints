import express from 'express';
import cors from 'cors';

import connectToMongo from './db.js';
import userAuthRoute from './routes/auth/userAuth.js';
import managerAuthRoute from './routes/auth/managerAuth.js';
import trainComplaintsRoute from './routes/complaints/trainComplaint.js';
import stationComplaintsRoute from './routes/complaints/stationComplaint.js';

connectToMongo();   //database connection
const app = express();  //create an express app
const port = 5000;

app.use(cors());    //cors origin resource sharing
app.use(express.json());

app.use('/auth/user', userAuthRoute);     //Route for user authentication
app.use('/auth/manager', managerAuthRoute);     //Route for manager authentication
app.use('/complaints/traincomplaint', trainComplaintsRoute);     //Route for manager authentication
app.use('/complaints/stationcomplaint', stationComplaintsRoute);     //Route for manager authentication

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})