import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const navigate = useNavigate();
    const budget = location.state?.budget || null;

   // const [name, setName] = useState(budget? budget.name : '');
    const [budgetLimit, setBudgetLimit] = useState(budget ? budget.budgetLimit : '');
    const [type, setType] = useState(budget ? budget.type : '');
    const [tag, setTag] = useState(budget ? budget.tag : '');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!budget) {
            alert('No budget found.');
            return;
        }

        try {
            const response = await fetch(`/api/budgets/${budget.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //name,
                    type,
                    budgetLimit: parseFloat(budgetLimit),
                    tag,
                }),
            });

           const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }
    console.log(data);
                
                console.log("Budget updated successfully:", data);
                navigate('/viewBudgets');
        } catch (error) {
            console.error('Error adding budget:', error);
            alert('Failed to add budget. Please try again.');
        }
    };
        // Create new budget
       /* try {
            const response = await fetch('/api/budgets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    type,
                    budgetLimit: parseFloat(budgetLimit),
                    tag,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }
        } catch (error) {
            console.error('Error adding budget:', error);
            alert('Failed to add budget. Please try again.');
        }
        console.log(budget.id);

        // Delete old budget
        try {
            console.log(budget.id);
            const response = await fetch(`/api/budgets/${budget.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete budget ${budget.id}`);
            }
            navigate('/viewBudgets');
        } catch (error) {
            console.error('Error deleting budget:', error);
            alert('Failed to delete budget. Please try again.');
        }
    };*/


return(  
    <div classname = "EditBudget">
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
        <h2> Edit Budget</h2>
        <form onSubmit={handleSubmit}>
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
            value={budgetLimit}
            label="Budget Amount"
            onChange={(e) => setBudgetLimit(e.target.value)}
            />
            <FormControl sx={{ minWidth: 213.17 }}>
                <InputLabel>Tag</InputLabel>
                        <Select
                            value={tag}
                            label="Tag"
                            onChange={(e) => setTag(e.target.value)}
                        >
                            <MenuItem value="housing">Housing</MenuItem>
                            <MenuItem value="utilities">Utilities</MenuItem>
                            <MenuItem value="groceries">Groceries</MenuItem>
                            <MenuItem value="transportation">Transportation</MenuItem>
                            <MenuItem value="healthcare">Healthcare</MenuItem>
                            <MenuItem value="dining">Dining Out</MenuItem>
                            <MenuItem value="entertainment">Entertainment</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                            <MenuItem value="travel">Travel</MenuItem>
                            <MenuItem value="fitness">Fitness</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="professional">Professional Development</MenuItem>
                            <MenuItem value="technology">Technology</MenuItem>
                            <MenuItem value="savings">Savings</MenuItem>
                            <MenuItem value="investments">Investments</MenuItem>
                            <MenuItem value="emergency">Emergency Fund</MenuItem>
                            <MenuItem value="retirement">Retirement</MenuItem>
                            <MenuItem value="gifts">Gifts</MenuItem>
                            <MenuItem value="hobbies">Hobbies</MenuItem>
                            <MenuItem value="petcare">Pet Care</MenuItem>
                            <MenuItem value="personalcare">Personal Care</MenuItem>
                            <MenuItem value="insurance">Insurance</MenuItem>
                            <MenuItem value="subscriptions">Subscriptions</MenuItem>
                        </Select>
                    </FormControl>
          <Button
              type="submit"
              style ={{
                  float:'right',
                  color: 'white',
                  backgroundColor:'black',
                  height:30,
                  width:200
              }}
          >
            Submit
          </Button>
        </Stack>
  
 <br></br>  
 </form>
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

export default EditBudget;