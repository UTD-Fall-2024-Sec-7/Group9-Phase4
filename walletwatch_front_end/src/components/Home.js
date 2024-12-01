import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';

function Home() {

    useEffect(() => {
        logoutUser();
    }, []);

    const logoutUser = async (e) => {
        try {
            const response = await fetch('/api/logout')
            const data = await response.json();
            if (!response.ok) {
                alert(data.error);
                return;
            }
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <div classname = "Home">
            <header classname = "header" >
            <Stack direction="row" spacing={65} sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
            <Button>
            <HelpIcon style ={{color: 'black'}}></HelpIcon>
       </Button>
       
            <h1> WalletWatch</h1>
<Link to="/login"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
        <p>Login</p>
     </Button></Link>
            </Stack>
     </header>
     <h2 style={{ textAlign: 'center', fontFamily: 'Arial'}}> Welcome to WalletWatch!</h2>
     <p style={{ textAlign: 'center', fontFamily: 'Arial' }}>
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