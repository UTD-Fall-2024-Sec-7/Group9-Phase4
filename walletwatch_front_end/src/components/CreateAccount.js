import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './Login.css';

function CreateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [income, setIncome] = useState('');
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
            console.log('Account created successfully:', data);
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error creating account:', error);
            alert("Email already in use. Please use another email or head over to the login page.");
        }
    };

    return (
        <div className="CreateAccount">
            <header className="header">
                <h1 style={{ textAlign: 'center' }}>WalletWatch</h1>
            </header>
            <h2 style={{ textAlign: 'center' }}>Account Creation</h2>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        id="income"
                        label="Income Level"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </Stack>
                <footer className="footer">
                    <Stack direction="row" spacing={150} sx={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link to="/">
                            <Button style={{color: 'white', backgroundColor:'black', height:50}}>
                                <p>Back</p>
                            </Button>
                        </Link>
                        <Button type="submit" style={{color: 'white', backgroundColor:'black', height:50}}>
                            <p>Submit</p>
                        </Button>
                    </Stack>
                </footer>
            </form>
        </div>
    );
}

export default CreateAccount;

/*
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function CreateAccount() {
    return (
        <div classname = "CreateAccount">
            <header classname = "header">
            <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
             </header>
             <h2 style={{ textAlign: 'center'}}>Account Creation</h2>

             <Stack spacing={2} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
             <TextField
          required
          id="outlined-required"
          label="First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
        />
        <TextField
          required
          id="outlined-required"
          label="Income Level"
        />
        </Stack>
             <footer classname = "footer">
             <Stack direction="row" spacing={150} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>

    <Link to="/"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Back</p>
     </Button></Link>
     <Link to="/Dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Submit</p>
     </Button></Link>
                 </Stack>
     </footer>
        </div>
    );
}

export default CreateAccount;
 */

/*import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function CreateAccount() {
    return (
        <div classname = "CreateAccount">
            <header classname = "header">
            <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
             </header>    
             <h2 style={{ textAlign: 'center'}}>Account Creation</h2>
           
             <Stack spacing={2} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
             <TextField
          required
          id="outlined-required"
          label="First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
        />
        <TextField
          required
          id="outlined-required"
          label="Income Level"
        />
        </Stack>
             <footer classname = "footer">
             <Stack direction="row" spacing={150} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>

    <Link to="/"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Back</p>
     </Button></Link>
     <Link to="/Dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Submit</p>
     </Button></Link>
                 </Stack>
     </footer>
        </div>
    );
}

export default CreateAccount;*/