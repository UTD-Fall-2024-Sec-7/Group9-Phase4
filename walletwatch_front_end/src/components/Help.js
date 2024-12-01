import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';


const Help = () => {
    const navigate = useNavigate();

    return (
       <div classname = "Help">
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
                <h1 style={{ textAlign: 'center' }}>Help</h1>
            </main>
            <Stack direction="row" spacing={50} sx={{justifyContent: "center", alignItems: "center",}}>
            <Link to="/contact"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
            <p>Contact</p>
            </Button></Link>
            <Link to="/faq"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
            <p>FAQ</p>
            </Button></Link> 
            </Stack>

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

export default Help;