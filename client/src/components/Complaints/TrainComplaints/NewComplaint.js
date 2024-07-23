import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const NewComplaint = (props) => {

	const [selectedType, setSelectedType] = useState(''); // Default to an empty string
	const [selectedSubtype, setSelectedSubtype] = useState('0'); // Initialize with the index of the first subtype


	const complaintTypes = [
		'Select type of complaint',
		'Medical Assistance',
		'Security',
		'Divangjan Facilities',
		'Facilities with women with special needs',
		'Electrical equipment',
		'Coach - cleanliness',
		'Punctuality',
		'Water availability',
		'Coach - maintenance',
		'Catering and vending services',
		'Staff behavior',
		'Corruption / Bribery',
		'Bed roll',
	];

	const subtypeOptions = {
		'1': ['Medical Assistance'],
		'2': ['Eve-teasing/Misbehaviour/Rape', 'Theft of Passengers Belongings/Snatching', 'Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach', 'Harassment/Extortion by Security Personnel/Railway personnel', 'Nuisance by Hawkers/Beggar/Eunuch/Passenger', 'Luggage Left Behind/Unclaimed/Suspected Articles', 'Passenger Missing/Not responding call', 'Smoking/Drinking Alcohol/Narcotics', 'Dacoity/Robbery/Murder/Riots', 'Quarrelling/Hooliganism/Run over/Passenger Fallen down'],
		'3': ['Divyangjan coach unavailability', 'Divyangjan toilet /washbasin', 'Braille signage in coach'],
		'4': ['Baby food'],
		'5': ['AC', 'Fans', 'Lights', 'Charging points'],
		'6': ['Toilets', 'wash basins', 'cockroach/rodents', 'coach interior', 'coach interior'],
		'7': ['NTES app', 'Late running'],
		'8': ['Packaged drinking water/Rail neer', 'Toilet', 'Wash Basins'],
		'9': ['Window/Seat Broken', 'Window/Door locking problem', 'Tap leaking/Tap not working', 'Broken/Missing Toilet Fittings', 'Jerks/Abnormal Sound'],
		'10': ['Overcharging', 'Service Quality & Hygiene', 'Food Quality & Quantity', 'E-Catering', 'Food & Water Not Available'],
		'11': ['Staff behavior'],
		'12': ['Corruption / Bribery'],
		'13': ['Dirty/torn', 'Over charging', 'Non availability', 'E-bed roll'],
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

	const [newComplaint, setNewComplaint] = useState({ trainNumber: "", pnrNumber: "", type: "", subType: "", description: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Define the complaint object with the required data
		const complaintData = {
			trainNumber: newComplaint.trainNumber,
			pnrNumber: newComplaint.pnrNumber,
			type: complaintTypes[selectedType] || '',
			subtype: subtypeOptions[selectedType][selectedSubtype] || '',
			description: newComplaint.description,
		};

		try {
			const response = await fetch(
				'https://railway-complaints-server.onrender.com/complaints/traincomplaints/newcomplaint',
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
						trainNumber: '',
						pnrNumber: '',
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
						<Form.Label>Train Number</Form.Label>
						<Form.Control type="text" placeholder="Enter train number" name="trainNumber" value={newComplaint.trainNumber} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridMobile" className="input-field">
						<Form.Label>PNR Number</Form.Label>
						<Form.Control type="text" placeholder="Enter pnr number" name="pnrNumber" value={newComplaint.pnrNumber} onChange={onChange} required />
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