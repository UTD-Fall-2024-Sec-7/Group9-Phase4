import React from 'react';
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


function DeleteBudget(){
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
     <Box sx={{ width: '100%', length:'100%'}}>
     <Paper square elevation={3} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="black"
        indicatorColor="green"
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
        <FormControlLabel control={<Checkbox />}/>
        <Link to="/editBudget"> <Button style ={{color: 'white', backgroundColor:'black', height:30}}> <p> Edit</p></Button></Link>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Spending info" />
        <FormControlLabel control={<Checkbox/>}/>
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
        <Link to="/viewBudgets"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Cancel</p>
     </Button></Link>
     <Link to="/viewBudgets"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Delete</p>
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

export default DeleteBudget;