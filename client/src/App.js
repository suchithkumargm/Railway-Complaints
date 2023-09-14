import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route

import Home from './components/Home/Home.js';
import UserLogin from './components/Login/UserLogin.js';
import CreateUser from './components/Register/CreateUser.js';
import ManagerLogin from './components/Login/ManagerLogin.js';
import RegisterManager from './components/Register/RegisterManager.js';
import Alert from './components/Alert.js';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <Router>
      <Alert alert={alert} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/user/login" element={<UserLogin showAlert={showAlert}/> } />
          <Route path="/auth/user/createUser" element={<CreateUser showAlert={showAlert}/>} />
          <Route path="/auth/manager/login" element={<ManagerLogin showAlert={showAlert}/> } />
          <Route path="/auth/manager/register" element={<RegisterManager showAlert={showAlert}/>} />
          <Route path="/complaints" element={<Home showAlert={showAlert}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
