import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const NewComplaint = (props) => {

	const [newComplaint, setNewComplaint] = useState({ description: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Define the complaint object with the required data
		const complaintData = {
			description: newComplaint.description,
		};

		try {
			const response = await fetch(
				'http://localhost:5000/complaints/miscellaneouscomplaints/newcomplaint',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authToken: localStorage.getItem('token'),
					},
					body: JSON.stringify(complaintData),
				}
			);

			if (response.ok) {
				// HTTP status code 200-299 indicates success
				const json = await response.json();

				if (json) {
					// Handle success, e.g., show a success message or redirect
					props.showAlert('Complaint submitted successfully!', 'success');
					// You can also reset the form or navigate to another page
					// Reset the form:
					setNewComplaint({
						description: '',
					});
				} else {
					// Handle server-reported failure (if applicable)
					props.showAlert('Failed to submit complaint.', 'danger');
					console.log(json);
				}
			} else {
				console.log(response);
				// Handle non-2xx HTTP status codes (e.g., 400 Bad Request, 500 Internal Server Error)
				props.showAlert('Failed to submit complaint. Please try again later.', 'danger');
			}
		} catch (error) {
			console.error('Error submitting complaint:', error);
			// Handle any unexpected errors, e.g., show an error message
			props.showAlert('An error occurred. Please try again later.', 'danger');
		}
	};


	const onChange = (e) => {
		setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value })
	}

	return (
		<>
			<h1>New Complaint</h1>
			<Container className="container">
				<Form className="w-50 login-form" onSubmit={handleSubmit}>

					<Form.Group controlId="formGridMobile" className="input-field">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Enter description" name="description" value={newComplaint.description} onChange={onChange} required />
					</Form.Group>

					<Button variant="primary" type="submit" className="submit-button">
						Submit
					</Button>
				</Form>
			</Container>
		</>
	);
}

export default NewComplaint;