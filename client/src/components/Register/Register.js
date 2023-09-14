import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Register.css'; // Import the CSS file

function Register() {
  return (
    <Container className="container">
      <Form className="w-50 login-form">
        <Form.Group controlId="formGridName" className="input-field">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formGridEmail" className="input-field">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formGridPassword" className="input-field">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formGridMobile" className="input-field">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="tel" placeholder="Enter mobile number" />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
