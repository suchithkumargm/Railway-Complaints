import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import './Login.css'; // Import the CSS file

const UserLogin = (props) => {

	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({ email: "", password: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('https://railway-complaints-server.onrender.com/auth/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password })
		});
		const json = await response.json()
		if (json.success) {
			localStorage.setItem('token', json.authToken);
			localStorage.setItem('role', json.role);
			navigate("/user/complaints");
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
			<h5 className='mt-5'>User Login</h5>
			<div className="d-flex justify-content-center mt-5">
				<Form className="w-50 login-form" onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail" className="input-field">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" name="email" placeholder="Enter email" value={credentials.email} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="input-field">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} required />
					</Form.Group>
					<Button variant="primary" type="submit" className="submit-button">
						Submit
					</Button>
				</Form>
			</div>
		</>
	);
}

export default UserLogin;