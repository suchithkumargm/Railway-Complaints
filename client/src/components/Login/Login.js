import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import UserLogin from './UserLogin'; // Import your UserLogin component
import ManagerLogin from './ManagerLogin'; // Import your ManagerLogin component

function Login(props) {
    const { showAlert } = props;
    const [activeComponent, setActiveComponent] = useState('user'); // Default to UserLogin

    const switchToUserLogin = () => {
        setActiveComponent('user');
    };

    const switchToManagerLogin = () => {
        setActiveComponent('manager');
    };

    return (
        <div>
            <Nav className="justify-content-center" variant="underline" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={switchToUserLogin}>User Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={switchToManagerLogin}>Manager Login</Nav.Link>
                </Nav.Item>
            </Nav>
            {activeComponent === 'user' ? <UserLogin showAlert={showAlert} /> : <ManagerLogin showAlert={showAlert} />}
        </div>
    );
}

export default Login;
