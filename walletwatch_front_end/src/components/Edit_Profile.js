import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function Edit_Profile() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo);

    const [firstName, setFirstName] = useState(userInfo?.firstName || '');
    const [lastName, setLastName] = useState(userInfo?.lastName || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [income, setIncome] = useState(userInfo?.income || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    income: parseFloat(income)
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Account updated successfully:', data);
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error updating account:', error);
            alert("Email already in use. Please use another email or head over to the login page.");
        }
    };
    return (
        <div classname = "Edit_Profile">
            <header classname = "header">
                <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
            </header>
            <h2 style={{ textAlign: 'center'}}>Edit Profile</h2>

            <form onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField
                        id="outlined-required"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        id="outlined-required"
                        label="Income Level"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Old Password"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </Stack>
                <footer classname = "footer">
                <Stack direction="row" sx={{
                   justifyContent: "space-between",
                   alignItems: "center",
                   padding: "0 5px",
                    maxWidth: "1400px",
                    margin: "0 auto",
                   width: "100%",
                }}>
                    
                    <Link to="/transactions"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
                        <p>View Transactions</p>
                    </Button></Link>
                    <Link to="/viewBudgets"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
                        <p>View Budgets</p>
                    </Button></Link>
                    <Link to="/settings"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
                        <p>Settings</p>
                    </Button></Link>
                </Stack>
            </footer>
            </form>
        </div>
    );
}

export default Edit_Profile;