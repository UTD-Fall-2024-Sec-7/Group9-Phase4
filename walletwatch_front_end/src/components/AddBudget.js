import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function AddBudgets() {
    const [name, setName] = useState('');
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
                    name,
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

    return (
        <div className="AddBudget">
            <header className="header">
                <Stack direction="row" spacing={65} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Button>
                        <HelpIcon style={{ color: 'black' }} />
                    </Button>
                    <h1>WalletWatch</h1>
                    <Link to="/dashboard">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30 }}>
                            <p>Home</p>
                        </Button>
                    </Link>
                </Stack>
            </header>
            <h2>Add a Budget</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField
                        required
                        label="Budget Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Budget Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <TextField
                        required
                        label="Budget Amount"
                        type="number"
                        value={budgetLimit}
                        onChange={(e) => setBudgetLimit(e.target.value)}
                    />
                    <TextField
                        required
                        label="Tags"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </Stack>
                <br />
                <Button
                    type="submit"
                    style={{
                        float: 'right',
                        color: 'white',
                        backgroundColor: 'black',
                        height: 30,
                        width: 200
                    }}
                >
                    Submit
                </Button>
            </form>
            <footer className="footer">
                {/* Your existing footer code */}
            </footer>
        </div>
    );
}

export default AddBudgets;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import './Home.css';
// import HelpIcon from '@mui/icons-material/Help';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
//
//
// function AddBudgets()
// {
//     return(
//     <div classname = "AddBudget">
//     <header classname = "header" >
//     <Stack direction="row" spacing={65} sx={{
// justifyContent: "center",
// alignItems: "center",
// }}>
//     <Button>
//     <HelpIcon style ={{color: 'black'}}></HelpIcon>
// </Button>
//
//     <h1> WalletWatch</h1>
// <Link to="/dashboard"><Button style ={{color: 'white', backgroundColor:'black', height:30}}>
// <p>Home</p>
// </Button></Link>
//     </Stack>
// </header>
// <h2> Add a Budget</h2>
// <Stack spacing={2} sx={{
//     justifyContent: "center",
//     alignItems: "center"
//   }}>
//              <TextField
//           required
//           id="outlined-required"
//           label="Budget Type"
//         />
//         <TextField
//           required
//           id="outlined-required"
//           label="Budget Amount"
//         />
//         <TextField
//           required
//           id="outlined-required"
//           label="Tags"
//         />
//         </Stack>
//         <br></br>
//         <Link to="/viewBudgets"><Button style ={{float:'right', color: 'white', backgroundColor:'black', height:30, width:200}}>
//         <p>Submit</p>
//      </Button></Link>
//              <footer classname = "footer">
//    <Stack direction="row" spacing={50} sx={{
//     justifyContent: "center",
//     alignItems: "center",
//   }}>
//  <Link to="/createAccount"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
//         <p>View Transactions</p>
//      </Button></Link>
//      <Link to="/viewBudgets"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
//         <p>View Budgets</p>
//      </Button></Link>
//      <Link to="/createAccount"><Button style ={{color: 'white', backgroundColor:'black', height:30, width:200}}>
//         <p>Profile</p>
//      </Button></Link>
//      </Stack>
//      </footer>
// </div>
// );
// }
//
// export default AddBudgets;