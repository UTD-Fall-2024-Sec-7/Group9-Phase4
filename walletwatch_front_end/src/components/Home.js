import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';


function Home() {
    return (
        <div className="Home">
            <header className="header">
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 10px",
                        maxWidth: "1400px",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    <Link to="/Help"><Button>
                        <HelpIcon style={{color: 'black'}}></HelpIcon>
                    </Button></Link>

                    <h1> WalletWatch</h1>
                    <Link to="/login"><Button style={{color: 'white', backgroundColor: 'black', height: 30}}>
                        <p>Login</p>
                    </Button></Link>
                </Stack>
            </header>

            <main style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '60px 20px',
                backgroundColor: 'white'
            }}>
                <h2 style={{
                    fontFamily: 'Sans-serif',
                    fontSize: '2rem',
                    marginBottom: '2rem',
                    color: '#333'
                }}>
                    Welcome to WalletWatch!
                </h2>
                <p style={{

                    fontFamily: 'sans-serif',
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    color: '#666',
                    maxWidth: '600px',
                    textAlign: 'center'
                }}>
                    Your personal budget management app
                </p>
                <p style={{
                    fontFamily: 'Sans-serif',
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    color: '#444'
                }}>
                    Get started today!
                </p>
                <Link to="/createAccount">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2e7d32',
                            padding: '10px 30px',
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#1b5e20'
                            }
                        }}
                    >
                        Create Account
                    </Button>
                </Link>
            </main>
            <footer className="footer"></footer>
        </div>
    );
}

export default Home;