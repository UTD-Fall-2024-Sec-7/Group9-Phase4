//import React from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function ViewBudgets(){
    const [budgets, setBudgets] = useState([]);
    const [type, setType] = useState('spending');
    const [value, setValue] = useState('spending');

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch('/api/budgets');
            if (!response.ok) {
                throw new Error('Failed to fetch budgets');
            }
            const data = await response.json();
            setBudgets(data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setType(newValue);
    };

    return(
        <div className = "ViewBudgets">
            <header classname = "header" >
                <Stack direction="row" spacing={65} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                   <Link to="/Help"> <Button>
                        <HelpIcon style ={{color: 'black'}}></HelpIcon>
                    </Button></Link>

                    <h1> WalletWatch</h1>
                    <Link to="/dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
                        <p>Home</p>
                    </Button></Link>
                </Stack>
            </header>
            <h2> Your Budgets</h2>
            <Box sx={{ width: '100%', height: '50vh', borderColor: 'divider'}}>
                <Paper square elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor='black'
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "green"
                            }
                        }}
                    >
                        <Tab
                            value="savings"
                            label="Savings"
                        />
                        <Tab value="spending" label="Spending" />
                    </Tabs>
                    <List sx={{
                        maxHeight: 'calc(100% - 48px)',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '0.4em'
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888'
                        }
                    }}>
                        {budgets && budgets.length > 0 ? (
                            budgets
                                .filter(budget => budget.type.toLowerCase() === type.toLowerCase())
                                .map((budget) => (
                                    <React.Fragment key={budget.id}>
                                        <ListItem sx={{
                                            backgroundColor: '#f0f0f0',
                                            marginBottom: '8px',
                                            padding: '16px'
                                        }}>
                                            <Stack direction="column" sx={{ flexGrow: 1 }}>
                                                <ListItemText
                                                    primary={budget.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <div>${budget.budgetLimit.toFixed(2)}</div>
                                                            <div style={{ color: 'gray' }}>Category: {budget.tag}</div>
                                                        </React.Fragment>
                                                    }
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontWeight: 'bold'
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                            <Link to="/editBudget" state={{ budget }}>
                                                <Button style={{
                                                    color: 'white',
                                                    backgroundColor: 'black',
                                                    height: 30,
                                                    borderRadius: '4px'
                                                }}>
                                                    Edit
                                                </Button>
                                            </Link>
                                        </ListItem>
                                    </React.Fragment>
                                ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No budgets found" />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Box>
            <br></br>
            <Stack direction="row" spacing={120} sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Link to="/addBudget"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
                    <p>Add a New Budget</p>
                </Button></Link>
                <Link to="/deleteBudget"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
                    <p>Delete a Budget</p>
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
}

export default ViewBudgets;

/*import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function ViewBudgets(){
    const [value, setValue] = React.useState('savings');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return(
    <div className = "ViewBudgets">
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
     <h2> Your Budgets</h2>
     <Box sx={{ width: '100%', length:'100%', borderColor: 'divider'}}>
     <Paper square elevation={3} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='black'
        TabIndicatorProps={{
            style: {
              backgroundColor: "green"
            }
          }}
      >
        <Tab
          value="savings"
          label="Savings"
        />
        <Tab value="spending" label="Spending" />
      </Tabs>
      <List>
      <ListItem>
        <ListItemText primary="Spending info"/>
        <Link to="/editBudget"> <Button style ={{color: 'white', backgroundColor:'black', height:30}}> <p> Edit</p></Button></Link>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Spending info" />
        <Link to="/editBudget"> <Button style ={{color: 'white', backgroundColor:'black', height:30}}> <p> Edit</p></Button></Link>
      </ListItem>
      <Divider variant="inset" component="li" /> 
      </List>
      </Paper>
    </Box>
<br></br>
    <Stack direction="row" spacing={120} sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
        <Link to="/addBudget"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Add a New Budget</p>
     </Button></Link>
     <Link to="/deleteBudget"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Delete a Budget</p>
     </Button></Link> 
       </Stack>
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

export default ViewBudgets;*/