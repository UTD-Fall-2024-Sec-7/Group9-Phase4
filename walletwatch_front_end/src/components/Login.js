import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import './Login.css';
import TextField from '@mui/material/TextField';

function Login() {
  const url = '/api/login';
  const [loginDetails, setLoginDetails] = useState([{}]);
useEffect(()=> {
  fetch(`${url}`).then(
    res => {
      if (!res.ok){
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
  return res.json();
    } 
  ).then(
    data => {
      setLoginDetails(data)
      console.log(data)
    }
  )
  },[]);

  

    return (
        <div classname = "Login">
            <header classname = "header">
            <h1 style={{ textAlign: 'center'}}>WalletWatch</h1>
             </header>    
             <h2 style={{ textAlign: 'center'}}>Login</h2>
           
             
       <form>
        <Stack spacing={2} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
        />  
         </Stack>
         <br></br>
          <Stack direction="row" spacing={10} sx={{
    justifyContent: "center",
    alignItems: "center"
  }}>
    <Link to="/"><Button style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Back</p>
     </Button></Link>
     <Link to="/Dashboard"><Button type = "submit" style ={{color: 'white', backgroundColor:'black', height:50}}>
        <p>Submit</p>
     </Button></Link>  
     </Stack>
        </form>  
       
             <footer classname = "footer">
         
     </footer>
     
        </div>
    );
}

export default Login;