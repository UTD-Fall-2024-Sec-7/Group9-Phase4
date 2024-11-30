import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
    }, []);

    const logoutUser = async (e) => {
        try {
            const response = await fetch('/api/logout')
            const data = await response.json();
            if (!response.ok) {
                alert(data.error);
                return;
            }
            console.log(data);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            console.log(data);
            navigate('/Dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const email = prompt("Please enter your email address:");
        if (email) {
            // Send a request to the backend to initiate password reset
            fetch('/api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message || "If an account with this email exists, a password reset link has been sent.");
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("An error occurred. Please try again later.");
                });
        }
    };

    return (
        <div className="Login">
            <header className="header">
                <h1 style={{ textAlign: 'center' }}>WalletWatch</h1>
            </header>
            <h2 style={{ textAlign: 'center' }}>Login</h2>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <TextField
                        required
                        id="email"
                        label="Email"
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
                </Stack>
                <br />
                <Stack direction="row" spacing={10} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Link to="/">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 50 }}>
                            <p>Back</p>
                        </Button>
                    </Link>
                    <Button type="submit" style={{ color: 'white', backgroundColor: 'black', height: 50 }}>
                        <p>Submit</p>
                    </Button>
                </Stack>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
                </div>
            </form>

            <footer className="footer"></footer>
        </div>
    );
}

export default Login;

/*
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function Login() {
  const url = '/api/login';
  const [loginDetails, setLoginDetails] = useState([{}]);
useEffect(()=> {
  fetch(`${url}`).then(
    res => {
      if (!res.ok){
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  return res.json();
    }
  ).then(
    data => {
      setLoginDetails(data)
      console.log(data)
    }
  )
  },[]);



    return (
        <div classname = "Login">
            <header classname = "header">
            <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
             </header>
             <h2 style={{ textAlign: 'center'}}>Login</h2>


       <form>
        <Stack spacing={2} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
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
         </Stack>
         <br></br>
          <Stack direction="row" spacing={10} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
    <Link to="/"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Back</p>
     </Button></Link>
     <Link to="/Dashboard"><Button type = "submit" style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Submit</p>
     </Button></Link>
     </Stack>
        </form>

             <footer classname = "footer">

     </footer>

        </div>
    );
}

export default Login;
 */