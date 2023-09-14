import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import './Login.css'; // Import the CSS file

const Login = (props) => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
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
    <Container className="container">
      <Form className="w-50 login-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className="input-field">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={credentials.email} onChange={onChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="input-field">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;