import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

import NewComplaint from './NewComplaint.js';
import GetComplaints from './GetComplaints.js';

function TrainComplaints(props) {
    const { showAlert } = props;
    const [activeComponent, setActiveComponent] = useState('newComplaint'); // Default to UserLogin

    const switchToNewComplaint = () => {
        setActiveComponent('newComplaint');
    };

    const switchToGetComplaints = () => {
        setActiveComponent('getComplaints');
    };

    return (
        <div>
            <Nav className="justify-content-center" variant="underline" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={switchToNewComplaint}>New Complaint</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={switchToGetComplaints}>Get Complaints</Nav.Link>
                </Nav.Item>
            </Nav>
            {activeComponent === 'newComplaint' ? <NewComplaint showAlert={showAlert} /> : <GetComplaints showAlert={showAlert} />}
        </div>
    );
}

export default TrainComplaints;