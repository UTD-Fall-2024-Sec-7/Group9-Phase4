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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
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
            //console.log("data: ",data);
            setTransactions(data);
            resetFilters(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleFilter = (tag) => {
        setSelectedTag(tag);
        if (tag) {
            const filtered = transactions.filter((transaction) => transaction.tag === tag);
            setFilteredTransactions(filtered);
        } else {
            setFilteredTransactions(transactions); // Show all if no tag selected
        }
    };

    const resetFilters = (data) => {
        setSelectedTag("");
        setFilteredTransactions(data);
    };
/*
    const handleChange = (event, newValue) => {
      setDescription(newValue);
      setAmount(newValue);
      setType(newValue);
      setTag(newValue);
  };
*/
    const uniqueTags = [...new Set(transactions.map((transaction) => transaction.tag))];

    return (
        <div className="ViewTransactions">
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
            <Stack
                direction="row"
                spacing={2} 
                alignItems="center"
                sx={{
                    width: '100%'
                }}>
            <h2> Your Transactions</h2>
            <div style={{ flexGrow: 1 }}></div>
            <h2> Filter:</h2>
            <FormControl required sx={{ minWidth: 213.17, marginBottom: '20px' }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedTag}
                    label="Category"
                    onChange={(e) => handleFilter(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem> {/* Option to show all */}
                    {uniqueTags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
                </Stack>
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
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <React.Fragment key={transaction.id}>
                                    <ListItem sx={{
                                        backgroundColor: '#f0f0f0',
                                        marginBottom: '8px',
                                        padding: '16px'
                                    }}>
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
                                        <Link to="/edittransactions" state={{ transaction }}>
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
                                        </Link>
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
};

export default Transactions;