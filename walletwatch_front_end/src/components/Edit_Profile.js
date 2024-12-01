import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function Edit_Profile() {
    return (
        <div classname = "Edit_Profile">
            <header classname = "header">
            <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
             </header>    
             <h2 style={{ textAlign: 'center'}}>Edit Profile</h2>
           
             <Stack spacing={1} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
             <TextField
          id="outlined-required"
          label="First Name"
        />
        <TextField
          id="outlined-required"
          label="Last Name"
        />
        <TextField
          id="outlined-required"
          label="Email"
        />
        <TextField
          id="outlined-required"
          label=" New Password"
        />
        <TextField
          id="outlined-required"
          label="Income Level"
        />
        <TextField
          required
          id="outlined-required"
          label="Old Password"
        />
        </Stack>
             <footer classname = "footer">
             <Stack direction="row" spacing={150} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>

    <Link to="/Dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Back</p>
     </Button></Link>
     <Link to="/Dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Submit</p>
     </Button></Link>
                 </Stack>
     </footer>
        </div>
    );
}

export default Edit_Profile;