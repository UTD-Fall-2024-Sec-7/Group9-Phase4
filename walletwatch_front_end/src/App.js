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
import Transactions from './components/Transactions';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Settings from './components/Settings';
import Edit_Profile from './components/Edit_Profile';
import Help from './components/Help';
import EditTransactions from './components/EditTransactions';
import AddTransactions from './components/AddTransactions';
import DeleteTransactions from './components/DeleteTransactions';

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
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/edit_profile" element={<Edit_Profile/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/edittransactions" element={<EditTransactions />} />
        <Route path="/addtranscations" element={<AddTransactions/>} />
        <Route path="/deletetranscations" element={<DeleteTransactions/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
