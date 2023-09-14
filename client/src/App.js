import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Home />} /> {/* Use element prop */}
          <Route path="/login" element={<Login />} /> {/* Use element prop */}
          <Route path="/register" element={<Register />} /> {/* Use element prop */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
