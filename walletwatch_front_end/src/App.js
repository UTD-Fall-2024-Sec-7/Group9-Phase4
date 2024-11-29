import React, {useState, useEffect} from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Dashboard from './components/Dashboard';
import ViewBudgets from './components/ViewBudgets';
import AddBudget from './components/AddBudget';
import EditBudget from './components/EditBudget';
import DeleteBudget from './components/DeleteBudget';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="viewBudgets" element={<ViewBudgets />} />
        <Route path="addBudget" element={<AddBudget />} />
        <Route path="editBudget" element={<EditBudget />} />
        <Route path="deleteBudget" element={<DeleteBudget />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
