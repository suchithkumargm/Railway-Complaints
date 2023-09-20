// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Complaints from './components/Complaints/Complaints.js';

export default function AppRoutes(props) {
	const { showAlert } = props;
	return (
		<Routes>
			<Route path="/" element={<Home showAlert={showAlert} />} />
			<Route path="/login" element={<Login showAlert={showAlert} />} />
			<Route path="/register" element={<Register showAlert={showAlert} />} />
			<Route path="/user/complaints" element={<Complaints showAlert={showAlert} />} />
			<Route path="/manager/complaints" element={<Complaints showAlert={showAlert} />} />
		</Routes>
	);
}
