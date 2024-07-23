import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';

const ParcelComplaints = (props) => {
	const [complaints, setComplaints] = useState([]);
	const [reRender, setReRender] = useState(false);

	useEffect(() => {
		// Fetch complaints when the component mounts
		async function fetchComplaints() {
			try {
				const response = await fetch('https://railway-complaints-server.onrender.com/complaints/parcelcomplaints/getallcomplaints', {
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
	}, [reRender]); // Empty dependency array to run this effect once when the component mounts

	const handleUpdate = async (complaintId) => {
		try {
			await fetch(`http://localhost:5000/complaints/parcelcomplaints/updatestatus/${complaintId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'authToken': localStorage.getItem('token')
				}
			});
			props.showAlert('Complaint status resolved', 'success');
			setReRender(!reRender)
		} catch (error) {
			props.showAlert('Error updating status', 'danger');
			console.error('Error updating status:', error);
		}
	}

	return (
		<>
			<h1>Complaints</h1>
			<Accordion>
				{complaints.map((complaint) => (
					<Accordion.Item key={complaint._id} eventKey={complaint._id}>
						<Accordion.Header>
							<div class="d-flex w-100 justify-content-between px-4 font-weight-bold">
								<span>Type: {complaint.type}</span>
								<span>Status: <span className={complaint.status === 'pending' ? 'text-danger text-uppercase' : 'text-success text-uppercase'}>{complaint.status}</span></span>
							</div>
						</Accordion.Header>
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
						{
							complaint.status === 'pending' ?
								<Accordion.Body>
									<Button variant="success" onClick={() => handleUpdate(complaint._id)}>
										Mark as Resolved
									</Button>
								</Accordion.Body>
								: ''
						}
					</Accordion.Item>
				))}
			</Accordion>
		</>
	);
};

export default ParcelComplaints;