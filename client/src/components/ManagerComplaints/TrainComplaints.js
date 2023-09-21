// import React, { useState, useEffect } from 'react';
// import { Accordion } from 'react-bootstrap';

// const TrainComplaints = (props) => {
// 	const [complaints, setComplaints] = useState([]);

// 	useEffect(() => {
// 		// Fetch complaints when the component mounts
// 		async function fetchComplaints() {
// 			try {
// 				const response = await fetch('http://localhost:5000/complaints/traincomplaints/getallcomplaints', {
// 					method: 'GET',
// 					headers: {
// 						'Content-Type': 'application/json',
// 						'authToken': localStorage.getItem('token')
// 					}
// 				});

// 				if (response.ok) {
// 					const json = await response.json();
// 					setComplaints(json);
// 				} else {
// 					console.error('Failed to fetch complaints');
// 				}
// 			} catch (error) {
// 				console.error('Error fetching complaints:', error);
// 			}
// 		}

// 		fetchComplaints();
// 	}, []); // Empty dependency array to run this effect once when the component mounts

// 	return (
// 		<>
// 			<h1>Complaints</h1>
// 			<Accordion>
// 				{complaints.map((complaint) => (
// 					<Accordion.Item key={complaint._id} eventKey={complaint._id}>
// 						<Accordion.Header>Type: {complaint.type}</Accordion.Header>
// 						<Accordion.Body>
// 							<strong>Train Number:</strong> {complaint.trainNumber}
// 						</Accordion.Body>
// 						<Accordion.Body>
// 							<strong>PNR Number:</strong> {complaint.pnrNumber}
// 						</Accordion.Body>
// 						<Accordion.Body>
// 							<strong>Subtype:</strong> {complaint.subtype}
// 						</Accordion.Body>
// 						<Accordion.Body>
// 							<strong>Description:</strong> {complaint.description}
// 						</Accordion.Body>
// 						<Accordion.Body>
// 							<strong>Timestamp:</strong> {complaint.timestamp}
// 						</Accordion.Body>
// 					</Accordion.Item>
// 				))}
// 			</Accordion>
// 		</>
// 	);
// };

// export default TrainComplaints;


import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';

const TrainComplaints = (props) => {
	const [complaints, setComplaints] = useState([]);
	const [currentUserName, setCurrentUserName] = useState("");

	useEffect(() => {
		// Fetch complaints when the component mounts
		async function fetchComplaints() {
			try {
				const response = await fetch('http://localhost:5000/complaints/traincomplaints/getallcomplaints', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'authToken': localStorage.getItem('token')
					}
				});

				if (response.ok) {
					const json = await response.json();
					setComplaints(json);

				} else {
					console.error('Failed to fetch complaints');
				}
			} catch (error) {
				console.error('Error fetching complaints:', error);
			}
		}

		fetchComplaints();
	}, []); // Empty dependency array to run this effect once when the component mounts

	// Fetch user names for complaints
	async function fetchUserNamesForComplaint(user) {
		try {
			const userResponse = await fetch(`http://localhost:5000/auth/manager/getuser/${user}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authToken': localStorage.getItem('token')
				}
			});
			if (userResponse.ok) {
				const json = await userResponse.json();
				setCurrentUserName(json.name);
			} else {
				console.error('Failed to fetch user name for complaint');
			}
		} catch (error) {
			console.error('Error fetching user name for complaint:', error);
		}
	}

	return (
		<>
			<h1>Complaints</h1>
			<Accordion>
				{complaints.map((complaint) => {
					{fetchUserNamesForComplaint(complaint.user)}
					<Accordion.Item key={complaint._id} eventKey={complaint._id}>
						<Accordion.Header>Type: {complaint.type}</Accordion.Header>
						<Accordion.Body>
							<strong>user name:</strong> {currentUserName}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Train Number:</strong> {complaint.trainNumber}
						</Accordion.Body>
						<Accordion.Body>
							<strong>PNR Number:</strong> {complaint.pnrNumber}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Subtype:</strong> {complaint.subtype}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Description:</strong> {complaint.description}
						</Accordion.Body>
						<Accordion.Body>
							<strong>Timestamp:</strong> {complaint.timestamp}
						</Accordion.Body>
					</Accordion.Item>
				})}
			</Accordion>
		</>
	);
};

export default TrainComplaints;