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
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [selectedTransactions, setSelectedTransactions] = useState([]);

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
            //console.log("data: ",data);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleCheckboxChange = (transactionId) => {
        if (!transactionId) return; // Add this check
        setSelectedTransactions(prev => {
            if (prev.includes(transactionId)) {
                return prev.filter(id => id !== transactionId);
            }
            return [...prev, transactionId];
        });
    };

    const handleDelete = async () => {
        try {
            for (const transactionId of selectedTransactions) {
                const response = await fetch(`/api/transactions/${transactionId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete transaction ${transactionId}`);
                }
            }
            alert('Selected transactions successfully deleted')
            navigate('/transactions');
        } catch (error) {
            console.error('Error deleting transactions:', error);
            alert('Failed to delete transactions. Please try again.');
        }
    };

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
            <h2> Delete Transactions</h2>
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
                                <React.Fragment key={transaction.id}>
                                    <ListItem sx={{
                                        backgroundColor: '#f0f0f0',
                                        marginBottom: '8px',
                                        padding: '16px'
                                    }}>
                                        <Checkbox
                                            checked={selectedTransactions.includes(transaction.id)}
                                            onChange={() => handleCheckboxChange(transaction.id)}
                                        />
                                        <Stack direction="row" spacing={2} sx={{
                                            flexGrow: 1,
                                            alignItems: 'center'
                                        }}>
                                            <Stack direction="column">
                                                <ListItemText
                                                    primary={
                                                        transaction.type === 'savings' ? (
                                                            <div style={{ color: 'green', fontWeight: 'bold' }}>
                                                                +${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}
                                                                <div style={{ color: 'gray' }}>{transaction.description}</div>
                                                            </div>
                                                        ) : (
                                                            <div style={{ color: 'red', fontWeight: 'bold' }}>
                                                                -${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}
                                                                <div style={{ color: 'gray' }}>{transaction.description}</div>
                                                            </div>
                                                        )
                                                    }
                                                    secondary={
                                                        <>
                                                            <div style={{fontWeight: 'bold' }}>{new Date(transaction.date).toLocaleDateString()}</div>
                                                            <div style={{ color: 'gray' }}>
                                                                {transaction.type === 'savings' ? 'Saving' : 'Spending'}
                                                            </div>
                                                        </>
                                                    }
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontWeight: 'bold'
                                                        }
                                                    }}
                                                />
                                            </Stack>
                                            <Chip
                                                label={transaction.tag}
                                                variant="outlined"
                                                sx={{
                                                    minWidth: '80px',
                                                    backgroundColor: 'mediumseagreen',  // lighter green on hover
                                                    borderColor: 'mediumseagreen',  // green color for border
                                                    color: '#e8f5e9',        // matching text color
                                                    fontWeight: 'bold',
                                                    borderRadius: '16px',
                                                    padding: '4px 8px',
                                                    height: '32px'
                                                }}
                                            />
                                        </Stack>
                                        <Button
                                            style={{
                                                color: 'white',
                                                backgroundColor: 'black',
                                                height: 30,
                                                borderRadius: '4px'
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </ListItem>
                                </React.Fragment>
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
                <Button
                    onClick={handleDelete}
                    disabled={selectedTransactions.length === 0}
                    style={{
                        color: 'white',
                        backgroundColor: selectedTransactions.length === 0 ? 'gray' : 'black',
                        height: 30
                    }}
                >
                    Delete Selected
                </Button>

                <Link to="/transactions">
                    <Button style={{ color: 'white', backgroundColor: 'black', height: 30, width: 200 }}>
                        Cancel
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