import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';


function Home() {
    return (
        <div classname = "Home">
            <header classname = "header" >
            <Stack direction="row" spacing={65} sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
            <Link to="/Help"><Button>
            <HelpIcon style ={{color: 'black'}}></HelpIcon>
       </Button></Link>
       
            <h1> WalletWatch</h1>
<Link to="/login"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Login</p>
     </Button></Link>
            </Stack>
     </header>
     <h2 style={{ textAlign: 'center' }}> Welcome to WalletWatch!</h2>
     <p style={{ textAlign: 'center' }}>
     Your personal budget management app <br></br><br></br>
      Get started today! <br></br><br></br>
 
     <Link to="/createAccount"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Create Account</p>
     </Button></Link>    </p>
     <footer classname = "footer">
     </footer>
        </div>
    );
}

export default Home;