import React, {useState, useEffect} from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
