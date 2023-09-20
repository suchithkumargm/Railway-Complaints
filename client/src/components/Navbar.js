import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
	const navLinkStyle = {
		fontSize: '25px',
	};

	let navigate = useNavigate();

	const handleLogout = () => {
		// Remove the 'token' from localStorage when logging out
		localStorage.removeItem('token');
		navigate('/')
	};

	return (
		<Nav className="justify-content-center" activeKey="/home">
			<Nav.Item>
				<Link to="/" className="nav-link" style={navLinkStyle}>
					Home
				</Link>
			</Nav.Item>
			{(localStorage.getItem('token')) ? (
				<>
					<Nav.Item>
						<Link className="nav-link" style={navLinkStyle} onClick={handleLogout}>
							Logout
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/complaints" className="nav-link" style={navLinkStyle}>
							Complaints
						</Link>
					</Nav.Item>
				</>
			) : (
				<>
					<Nav.Item>
						<Link to="/login" className="nav-link" style={navLinkStyle}>
							Login
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/register" className="nav-link" style={navLinkStyle}>
							Register
						</Link>
					</Nav.Item>
				</>
			)}

		</Nav>
	);
}

export default Navbar;
