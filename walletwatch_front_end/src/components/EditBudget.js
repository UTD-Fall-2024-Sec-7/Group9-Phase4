import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


function EditBudget()
{
    return(  
    <div classname = "EditBudget">
    <header classname = "header" >
    <Stack direction="row" spacing={65} sx={{
justifyContent: "center",
alignItems: "center",
}}>
    <Button>
    <HelpIcon style ={{color: 'black'}}></HelpIcon>
</Button>

    <h1> WalletWatch</h1>
<Link to="/dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
<p>Home</p>
</Button></Link>
    </Stack>
</header>
<h2> Edit Budget</h2>
<Stack spacing={2} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
             <TextField
          required
          id="outlined-required"
          label="Budget Type"
        />
        <TextField
          required
          id="outlined-required"
          label="Budget Amount"
        />
        <TextField
          required
          id="outlined-required"
          label="Tags"
        />
        </Stack>
        <br></br>
        <Link to="/viewBudgets"><Button style ={{float:'right', color: 'white', backgroundColor:'black', height:30, width:200}}>
        <p>Submit</p>
     </Button></Link> 
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
     <Link to="/createAccount"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
        <p>Profile</p>
     </Button></Link> 
     </Stack>
     </footer>
</div>
);
}

export default EditBudget;