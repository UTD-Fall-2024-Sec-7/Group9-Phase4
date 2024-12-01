import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';


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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div classname = "Dashboard">
            <header classname = "header" >
            <Stack direction="row" spacing={65} sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
            <Button>
            <HelpIcon style ={{color: 'black'}}></HelpIcon>
       </Button>
       
            <h1> WalletWatch</h1>
<Link to="/login"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Logout</p>
     </Button></Link>
            </Stack>
     </header>
     <h2 style={{ textAlign: 'center' }}> Welcome {user.firstName}!</h2>
     <p style={{ textAlign: 'center' }}>
    <h3 style={{textAlign:'center'}}> What would you like to do today?</h3>
        </p>
     <footer classname = "footer">
     <Stack direction="row" spacing={50} sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
 <Link to="/createAccount"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
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