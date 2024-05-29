import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import CreateUser from './CreateUser.js'; // Import your UserLogin component
import RegisterManager from './RegisterManager.js'; // Import your ManagerLogin component

function Register(props) {
    const { showAlert } = props;
    const [activeComponent, setActiveComponent] = useState('user'); // Default to UserLogin

    const switchToCreateUser = () => {
        setActiveComponent('user');
    };

    const switchToRegisterManager = () => {
        setActiveComponent('manager');
    };

    return (
        <div>
            <Nav className="justify-content-center" variant="underline" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={switchToCreateUser}>Create User</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={switchToRegisterManager}>Register Manager</Nav.Link>
                </Nav.Item>
            </Nav>
            {activeComponent === 'user' ? <CreateUser showAlert={showAlert} /> : <RegisterManager showAlert={showAlert} />}
        </div>
    );
}

export default Register;