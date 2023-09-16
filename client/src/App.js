import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Alert from './components/Alert';
import Navbar from './components/Navbar';
import AppRoutes from './Routes'; // Import your route configuration

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Router>
      <Alert alert={alert} />
      <Navbar />
      <div className="App">
        {/* Use the route configuration component */}
        <AppRoutes showAlert={showAlert} />
      </div>
    </Router>
  );
}

export default App;