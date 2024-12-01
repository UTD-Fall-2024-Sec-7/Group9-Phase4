import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';

const FAQ = () => {
    const navigate = useNavigate();

    return (
        <div className="help-page">
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
                <h1 style={{ marginLeft: '50px' }}>FAQ</h1>
                <h2 style={{ marginLeft: '50px' }}>Q: How do I set up a budget?</h2>
                <h2 style={{ marginLeft: '100px' }}>A: Start by going to the Budgets page and entering your monthly goals. you can categorize expenses and set specific amounts for each.</h2>
                <h2 style={{ marginLeft: '50px' }}>Q: How can I view spednging trends over time?</h2>
                <h2 style={{ marginLeft: '100px' }}>A: Use the budgest section to view spending patterns and trends over weeks, months, or years. Customizable charts and filter allow for detailed insights into how your expenses change over time.</h2>
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

export default FAQ;