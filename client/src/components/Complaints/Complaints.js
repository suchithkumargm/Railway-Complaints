import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

import TrainComplaints from './TrainComplaints/TrainComplaints.js'; 
import StationComplaints from './StationComplaints/StationComplaints.js'; 
import ParcelComplaints from './ParcelComplaints/ParcelComplaints'; 
import MiscellaneousComplaints from './MiscellaneousComplaints/MiscellaneousComplaints';
import './Complaints.css';

const Complaints=(props) =>{
  const { showAlert } = props;
  const [activeComponent, setActiveComponent] = useState('train'); // Default to 'train'

  const switchToTab = (tab) => {
    setActiveComponent(tab);
  };

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/train" className="nav-tabs">
        <Nav.Item>
          <Nav.Link
            onClick={() => switchToTab('train')}
            className={`nav-link ${activeComponent === 'train' ? 'active' : ''}`}
          >
            Train Complaints
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => switchToTab('station')}
            className={`nav-link ${activeComponent === 'station' ? 'active' : ''}`}
          >
            Station Complaints
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => switchToTab('parcel')}
            className={`nav-link ${activeComponent === 'parcel' ? 'active' : ''}`}
          >
            Parcel Complaints
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => switchToTab('miscellaneous')}
            className={`nav-link ${activeComponent === 'miscellaneous' ? 'active' : ''}`}
          >
            Miscellaneous Complaints
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* Render the active component based on activeComponent state */}
      {activeComponent === 'train' && <TrainComplaints showAlert={showAlert}/>}
      {activeComponent === 'station' && <StationComplaints showAlert={showAlert}/>}
      {activeComponent === 'parcel' && <ParcelComplaints showAlert={showAlert}/>}
      {activeComponent === 'miscellaneous' && <MiscellaneousComplaints showAlert={showAlert}/>}
    </div>
  );
}

export default Complaints;
