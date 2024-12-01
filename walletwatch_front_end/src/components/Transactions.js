import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]); // Define transactions state
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        // Fetch transactions from an API or other data source
        fetchTransactions();
    }, []);

    // Function to fetch transactions
    const fetchTransactions = async () => {
        try {
            const response = await fetch('/api/transactions');
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            const data = await response.json();
            console.log("data: ",data);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
/*
    const handleChange = (event, newValue) => {
      setDescription(newValue);
      setAmount(newValue);
      setType(newValue);
      setTag(newValue);
  };
*/
    return (
        <div className="ViewTransactions">
            <header className="header">
                <Stack direction="row" spacing={65} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Link to="/help">
                    <Button>
                        <HelpIcon style={{ color: 'black' }} />
                    </Button>
                    </Link>
                    <h1> WalletWatch</h1>
                    <Link to="/dashboard">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30 }}>
                            Home
                        </Button>
                    </Link>
                </Stack>
            </header>
            <h2> Your Transactions</h2>
            <Box sx={{ width: '100%', height: '50vh', borderColor: 'divider' }}>
                <Paper square elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <List
                        sx={{
                            maxHeight: 'calc(100% - 48px)',
                            overflow: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '0.4em',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                            },
                        }}
                    >
                        {transactions && transactions.length > 0 ? (
                            transactions.map((transaction) => (
                              <ListItem key={transaction[0]} sx={{ backgroundColor: '#f0f0f0', marginBottom: '8px', padding: '16px' }}>
                                    <Stack direction="column" sx={{ flexGrow: 1 }}>
                                        <ListItemText
                                            primary={
                                                <div style={{ color: 'black', fontWeight: 'bold' }}>
                                                    ${transaction[2] ? transaction[2].toFixed(2) : '0.00'}
                                                </div>
                                          }
                                            secondary={
                                                <>
                                                    <div>{new Date(transaction[4]).toLocaleDateString()}</div>
                                                    <div style={{ color: 'gray' }}>Description: {transaction[3]}</div>
                                                    <div style={{ color: 'gray' }}>Tag: {transaction[5]}</div>
                                                    <div style={{ color: 'gray' }}>
                                                    Type: {transaction[1] === 'savings' ? 'Saving' : 'Spending'}
                                                    </div>
                                                </>
                                            }
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: 'bold',
                                                },
                                            }}
                                        />
                                    </Stack>
                                    <Link to="/edittransactions">
                                        <Button
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'black',
                                                height: 30,
                                                borderRadius: '4px',
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No transactions found" />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Box>
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                <Link to="/addtranscations">
                    <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                        Add
                    </Button>
                </Link>

                <Link to="/deletetranscations">
                    <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                        Delete
                    </Button>
                </Link>
            </div>
            <footer className="footer">
                <Stack direction="row" spacing={50} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Link to="/transactions">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                            View Transactions
                        </Button>
                    </Link>
                    <Link to="/viewBudgets">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                            View Budgets
                        </Button>
                    </Link>
                    <Link to="/settings">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                            Settings
                        </Button>
                    </Link>
                </Stack>
            </footer>
        </div>
    );
};

export default Transactions;
