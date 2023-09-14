import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Login.css'; // Import the CSS file

function Login() {
  return (
    <Container className="container">
      <Form className="w-50 login-form">
        <Form.Group controlId="formBasicEmail" className="input-field">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="input-field">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
