import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';

const Contact = () => {
    const navigate = useNavigate();

    return (
        <div className="Contact">
            <header classname = "header" >
            <Stack direction="row" spacing={65} sx={{justifyContent: "center", alignItems: "center",}}>
            <Button>
            <HelpIcon style ={{color: 'black'}}></HelpIcon>
            </Button>
       
            <h1> WalletWatch</h1>
        <Link to="/dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Home</p>
        </Button></Link>
        </Stack>
        </header>

            {/* Page content */}
            <main>
                <h1 style={{ marginLeft: '50px' }}>Contact Information</h1>
                <h2 style={{ marginLeft: '50px' }}>email</h2>
                <h2 style={{ marginLeft: '50px' }}>phone number</h2>
            </main>

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
};

export default Contact;