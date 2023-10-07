import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';

import './Register.css'; // Import the CSS file

const CreateUser = (props) => {

	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "", mobile: "" })

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword, mobile } = credentials;
		if (password === cpassword) {
			const response = await fetch('https://railwaycomplaints.onrender.com/auth/user/createuser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password, mobile })
			});
			const json = await response.json()
			if (json.success) {
				localStorage.setItem('token', json.authToken);
				localStorage.setItem('role',json.role);
				navigate("/");
				props.showAlert("Accont Created Successfully!", "success")
			}
			else {
				props.showAlert("Invalid Details!", "danger")
			}
		} else {
			props.showAlert("Passwords should match", "danger");
		}
	}

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<>
			<h5 className='mt-5'>Create User</h5>
			<div className="d-flex justify-content-center mt-5">
				<Form className="w-50 login-form" onSubmit={handleSubmit}>
					<Form.Group controlId="formGridName" className="input-field">
						<Form.Label>Name</Form.Label>
						<Form.Control id="name" type="text" placeholder="Enter your name" name="name" value={credentials.name} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridEmail" className="input-field">
						<Form.Label>Email</Form.Label>
						<Form.Control id="email" type="email" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridPassword" className="input-field">
						<Form.Label>Password</Form.Label>
						<Form.Control id="password" type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridPassword" className="input-field">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control id="cpassword" type="password" placeholder="Password" name="cpassword" value={credentials.cpassword} onChange={onChange} required />
					</Form.Group>

					<Form.Group controlId="formGridMobile" className="input-field">
						<Form.Label>Mobile</Form.Label>
						<Form.Control id="mobile" type="tel" placeholder="Enter mobile number" name="mobile" value={credentials.mobile} onChange={onChange} required />
					</Form.Group>

					<Button variant="primary" type="submit" className="submit-button">
						Submit
					</Button>
				</Form>
			</div>
		</>
	);
}

export default CreateUser;