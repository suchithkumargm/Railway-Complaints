import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const NewComplaint = (props) => {

	const [selectedType, setSelectedType] = useState(''); // Default to an empty string
	const [selectedSubtype, setSelectedSubtype] = useState('0'); // Initialize with the index of the first subtype


	const complaintTypes = [
		'Select type of complaint',
		'Luggage / Parcels',
		'Goods'
	];

	const subtypeOptions = {
		'1': ['Parcel Facilitation'],
		'2': ['Freight Facilitation'],
	};

	const handleTypeChange = (e) => {
		const type = e.target.value;
		setSelectedType(type);
		setSelectedSubtype('');
	};

	const handleSubtypeChange = (e) => {
		const type = e.target.value;
		setSelectedSubtype(type);
	};

	const [newComplaint, setNewComplaint] = useState({ parcelNumber: "", type: "", subType: "", description: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Define the complaint object with the required data
		const complaintData = {
			parcelNumber: newComplaint.parcelNumber,
			type: complaintTypes[selectedType] || '',
			subtype: subtypeOptions[selectedType][selectedSubtype] || '',
			description: newComplaint.description,
		};

		try {
			const response = await fetch(
				'http://localhost:5000/complaints/parcelcomplaints/newcomplaint',
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
						parcelNumber: '',
						type: '',
						subType: '',
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
					<Form.Group controlId="formGridName" className="input-field">
						<Form.Label>Parcel Number</Form.Label>
						<Form.Control type="text" placeholder="Enter parcel number" name="parcelNumber" value={newComplaint.parcelNumber} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridComplaintType" className="input-field">
						<Form.Label>Type</Form.Label>
						<Form.Select
							aria-label="Select complaint type"
							onChange={handleTypeChange}
							value={selectedType}
						>
							{complaintTypes.map((type, index) => (
								<option key={index} value={index.toString()}>
									{type}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Form.Group controlId="formGridComplaintSubtype" className="input-field">
						<Form.Label>Subtype</Form.Label>
						{selectedType !== '' ? (
							<Form.Select
								aria-label="Select complaint subtype"
								onChange={handleSubtypeChange}
								value={selectedSubtype}
							>
								{subtypeOptions[selectedType].map((subtype, index) => (
									<option key={index} value={index.toString()}>
										{subtype}
									</option>
								))}
							</Form.Select>
						) : (
							<div>Please select a complaint type first</div>
						)}
					</Form.Group>


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