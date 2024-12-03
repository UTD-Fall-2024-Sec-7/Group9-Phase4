import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';

function Settings() {
    const navigate = useNavigate();

    const logoutUser = async (e) => {
        try {
            const response = await fetch('/api/logout')
            const data = await response.json();
            if (!response.ok) {
                alert(data.error);
                return;
            }
            sessionStorage.clear(); // Clear session storage
            console.log(data);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('An error occurred during logout. Please try again.');
        }
    };

    return (
        <div classname = "settings">
            <header className="header">
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 5px",
                        maxWidth: "1400px",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    <Link to="/Help">
                        <Button>
                            <HelpIcon style={{color: 'black'}} />
                        </Button>
                    </Link>
                    <h1>WalletWatch</h1>
                    <Link to="/dashboard">
                        <Button style={{color: 'white', backgroundColor: 'black', height: 30}}>
                            <p>Home</p>
                        </Button>
                    </Link>
                </Stack>
            </header>


            <main>
                <h1 style={{ textAlign: 'center' }}>Settings</h1>
            </main>
            <Stack direction="row" spacing={50} sx={{justifyContent: "center", alignItems: "center",}}>
            <Link to="/edit_profile"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
            <p>Edit Profile</p>
            </Button></Link>
            <Button
                onClick={logoutUser}
                style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
            <p>Log Out</p>
            </Button>
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
        </div>
    );
}

export default Settings;