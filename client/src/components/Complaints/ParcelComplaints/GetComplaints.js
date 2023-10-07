import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const GetComplaints = (props) => {
	const [complaints, setComplaints] = useState([]);

	useEffect(() => {
		// Fetch complaints when the component mounts
		async function fetchComplaints() {
			try {
				const response = await fetch('https://railwaycomplaints.onrender.com/complaints/parcelcomplaints/getusercomplaints', {
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

	// Function to handle complaint deletion
	const handleDelete = async (complaintId) => {
		//Implement the delete logic here
		try {
			await fetch(`https://railwaycomplaints.onrender.com/complaints/parcelcomplaints/deletecomplaint/${complaintId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'authToken': localStorage.getItem('token')
				}
			});
			// Update state to remove the deleted complaint
			setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint._id !== complaintId));
			props.showAlert('Complaint deleted successfully', 'success');
		} catch (error) {
			props.showAlert('Error deleting Complaint', 'danger');
			console.error('Error deleting complaint:', error);
		}
	};

	return (
		<>
			<h1>Complaints</h1>
			<Accordion>
				{complaints.map((complaint) => (
					<Accordion.Item key={complaint._id} eventKey={complaint._id}>
						<Accordion.Header>Type: {complaint.type}</Accordion.Header>
						<Accordion.Body>
							<strong>Parcel Number:</strong> {complaint.parcelNumber}
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
						<Accordion.Body>
							<Button variant="danger" onClick={() => handleDelete(complaint._id)}>
								<FaTrash /> Delete
							</Button>
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</>
	);
};

export default GetComplaints;