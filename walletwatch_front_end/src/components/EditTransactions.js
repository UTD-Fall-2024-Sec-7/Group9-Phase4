import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function EditTransaction() {
    const location = useLocation();
    const navigate = useNavigate();
    const transaction = location.state?.transaction || null;

    const [description, setDescription] = useState(transaction ? transaction.description : '');
    const [amount, setAmount] = useState(transaction ? transaction.amount : '');
    const [type, setType] = useState(transaction ? transaction.type : '');
    const [tag, setTag] = useState(transaction ? transaction.tag : '');

    // Ensure you are properly receiving the transaction object

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transaction) {
            alert('No transaction data found.');
            return;
        }

        try {
            const response = await fetch(`/api/transactions/${transaction.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //name,
                    type,
                    amount: parseFloat(amount),
                    description,
                    tag
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }
            console.log(data);
            //console.log("Transaction updated successfully:", data);
            navigate('/transactions');
        } catch (error) {
            console.error('Error updating transaction:', error);
            alert('Failed to edit transaction. Please try again.');
        }
    };

        // Create new transaction
    //     try {
    //         const response = await fetch('/api/transactions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 type,
    //                 amount,
    //                 description,
    //                 tag,
    //             }),
    //         });
    //
    //         const data = await response.json();
    //
    //         if (!response.ok) {
    //             alert(data.error);
    //             return;
    //         }
    //     } catch (error) {
    //         console.error('Error adding transaction:', error);
    //         alert('Failed to add transaction. Please try again.');
    //     }
    //
    //     // Delete old transaction if it's available
    //     try {
    //         const response = await fetch(`/api/transactions/${transaction.id}`, {
    //             method: 'DELETE',
    //         });
    //         if (!response.ok) {
    //             throw new Error(`Failed to delete transaction ${transaction.id}`);
    //         }
    //         navigate('/transactions');
    //     } catch (error) {
    //         console.error('Error deleting transaction:', error);
    //         alert('Failed to delete transaction. Please try again.');
    //     }
    // };

    return (
        <div className="EditTransaction">
            <header className="header">
                <Stack direction="row" spacing={65} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Link to="/help">
                        <Button>
                            <HelpIcon style={{ color: 'black' }} />
                        </Button>
                    </Link>
                    <h1>WalletWatch</h1>
                    <Link to="/dashboard">
                        <Button style={{ color: 'white', backgroundColor: 'black', height: 30 }}>
                            <p>Home</p>
                        </Button>
                    </Link>
                </Stack>
            </header>
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <FormControl sx={{ minWidth: 213.17 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={type}
                            label="Category"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="spending">Spending</MenuItem>
                            <MenuItem value="savings">Savings</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl sx={{ minWidth: 213.17 }}>
                        <InputLabel>Tag</InputLabel>
                        <Select
                            value={tag}
                            label="Tag"
                            onChange={(e) => setTag(e.target.value)}
                        >
                            <MenuItem value="housing">Housing</MenuItem>
                            <MenuItem value="utilities">Utilities</MenuItem>
                            <MenuItem value="groceries">Groceries</MenuItem>
                            <MenuItem value="transportation">Transportation</MenuItem>
                            <MenuItem value="healthcare">Healthcare</MenuItem>
                            <MenuItem value="dining">Dining Out</MenuItem>
                            <MenuItem value="entertainment">Entertainment</MenuItem>
                            <MenuItem value="shopping">Shopping</MenuItem>
                            <MenuItem value="travel">Travel</MenuItem>
                            <MenuItem value="fitness">Fitness</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="professional">Professional Development</MenuItem>
                            <MenuItem value="technology">Technology</MenuItem>
                            <MenuItem value="savings">Savings</MenuItem>
                            <MenuItem value="investments">Investments</MenuItem>
                            <MenuItem value="emergency">Emergency Fund</MenuItem>
                            <MenuItem value="retirement">Retirement</MenuItem>
                            <MenuItem value="gifts">Gifts</MenuItem>
                            <MenuItem value="hobbies">Hobbies</MenuItem>
                            <MenuItem value="petcare">Pet Care</MenuItem>
                            <MenuItem value="personalcare">Personal Care</MenuItem>
                            <MenuItem value="insurance">Insurance</MenuItem>
                            <MenuItem value="subscriptions">Subscriptions</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        style={{
                            float: 'right',
                            color: 'white',
                            backgroundColor: 'black',
                            height: 30,
                            width: 200,
                        }}
                    >
                        Submit
                    </Button>
                </Stack>
                <br />
            </form>
            <footer className="footer">
                <Stack direction="row" spacing={50} sx={{ justifyContent: "center", alignItems: "center" }}>
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
}

export default EditTransaction;
