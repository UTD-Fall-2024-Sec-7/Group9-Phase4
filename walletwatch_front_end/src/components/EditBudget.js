import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


function EditBudget()
{
    const [budgetLimit, setBudgetLimit] = useState('');
    const [type, setType] = useState('');
    const [tag, setTag] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/budgets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    budgetLimit: parseFloat(budgetLimit),
                    tag
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            console.log(data);
            navigate('/viewBudgets');
        } catch (error) {
            console.error('Error adding budget:', error);
            alert('Failed to add budget. Please try again.');
        }
    };

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
    <FormControl required sx={{ minWidth: 220 }}>
        <InputLabel>Budget Type</InputLabel>
        <Select
            value={type}
            label="Budget Type"
            onChange={(e) => setType(e.target.value)}
        >
            <MenuItem value="spending">Spending</MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
        </Select>
    </FormControl>
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
    <Link to="/viewBudgets"><Button style ={{float:'right', color: 'white', backgroundColor:'black', height:30, width:200}}>
        <p>Submit</p>
    </Button></Link>
</Stack>
    <br></br>
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