// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
// import TrainComplaints from './components/Complaints/TrainComplaints';
// import StationComplaints from './components/Complaints/StationComplaints';
// import ParcelComplaints from './components/Complaints/ParcelComplaints';
// import MiscellaneousComplaints from './components/Complaints/MiscellaneousComplaints';

export default function AppRoutes(props) {
    const { showAlert } = props;
  return (
    <Routes>
      <Route path="/" element={<Home showAlert={showAlert}/>} />
      <Route path="/login" element={<Login showAlert={showAlert}/>} />
      <Route path="/register" element={<Register showAlert={showAlert}/>} />

      {/* Train Complaints */}
      {/* <Route path="/trainComplaints/newComplaint" element={<TrainComplaints.NewComplaint showAlert={showAlert}/>} />
      <Route path="/trainComplaints/getallcomplaints" element={<TrainComplaints.GetAllComplaints showAlert={showAlert}/>} />
      <Route path="/trainComplaints/getusercomplaints" element={<TrainComplaints.GetUserComplaints showAlert={showAlert}/>} /> */}

      {/* Station Complaints */}
      {/* <Route path="/stationComplaints/newComplaint" element={<StationComplaints.NewComplaint showAlert={showAlert}/>} />
      <Route path="/stationComplaints/getallcomplaints" element={<StationComplaints.GetAllComplaints showAlert={showAlert}/>} />
      <Route path="/stationComplaints/getusercomplaints" element={<StationComplaints.GetUserComplaints showAlert={showAlert}/>} /> */}

      {/* Parcel Complaints */}
      {/* <Route path="/parcelComplaints/newComplaint" element={<ParcelComplaints.NewComplaint showAlert={showAlert}/>} />
      <Route path="/parcelComplaints/getallcomplaints" element={<ParcelComplaints.GetAllComplaints showAlert={showAlert}/>} />
      <Route path="/parcelComplaints/getusercomplaints" element={<ParcelComplaints.GetUserComplaints showAlert={showAlert}/>} /> */}

      {/* Miscellaneous Complaints */}
      {/* <Route path="/miscellaneousComplaints/newComplaint" element={<MiscellaneousComplaints.NewComplaint showAlert={showAlert}/>} />
      <Route path="/miscellaneousComplaints/getallcomplaints" element={<MiscellaneousComplaints.GetAllComplaints showAlert={showAlert}/>} />
      <Route path="/miscellaneousComplaints/getusercomplaints" element={<MiscellaneousComplaints.GetUserComplaints showAlert={showAlert}/>} /> */}
    </Routes>
  );
}
