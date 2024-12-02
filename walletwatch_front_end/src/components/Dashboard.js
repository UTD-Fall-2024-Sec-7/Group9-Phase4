import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import TransactionGraph from './Graph.js';

function Dashboard() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchName();
    }, []);

    const fetchName = async () => {
        try {
            const response = await fetch('/api/@me');
            const data = await response.json();
            setUser(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div classname = "Dashboard">
            <header className="header">
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 10px",
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
            <h2 style={{ textAlign: 'center', fontFamily: 'Sans-serif' }}> Welcome {user.firstName}!</h2>
            {/*<p style={{ textAlign: 'center' }}>*/}
            {/*    <h3 style={{textAlign:'center', fontFamily: 'Sans-serif'}}> What would you like to do today?</h3>*/}
            {/*</p>*/}
            <div style={{textAlign: 'center', fontFamily: 'Sans-serif'}}>
                <h4>Weekly Transaction Overview</h4>
                <TransactionGraph/>
            </div>
            <footer classname = "footer">
                <Stack direction="row" spacing={50} sx={{
                    justifyContent: "center",
                    alignItems: "center",
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

export default Dashboard;