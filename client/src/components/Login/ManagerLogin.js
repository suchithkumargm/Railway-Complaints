import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import './Login.css'; // Import the CSS file

const ManagerLogin = (props) => {

	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({ employeeId: "", password: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('https://railwaycomplaints.onrender.com/auth/manager/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ employeeId: credentials.employeeId, password: credentials.password })
		});
		const json = await response.json()
		if (json.success) {
			localStorage.setItem('token', json.authToken);
			localStorage.setItem('role', json.role);
			navigate("/manager/complaints");
			props.showAlert("Logged in Successfully!", "success")
		}
		else {
			props.showAlert("Invalid Credentials!", "danger")
		}
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<>
			<h5 className='mt-5'>Manager Login</h5>
			<div className="d-flex justify-content-center mt-5">
				<Form className="w-50 login-form" onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail" className="input-field">
						<Form.Label>Employee ID</Form.Label>
						<Form.Control type="text" name="employeeId" placeholder="Enter employee Id" value={credentials.employeeId} onChange={onChange} required/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="input-field">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} required/>
					</Form.Group>
					<Button variant="primary" type="submit" className="submit-button">
						Submit
					</Button>
				</Form>
			</div>
		</>
	);
}

export default ManagerLogin;